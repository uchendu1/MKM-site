var express = require('express');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var Design = require("./models/design");
var seedDB = require("./seeds");
var Comment = require("./models/comment");





seedDB();
// var db = "mongodb+srv://linda_1:lindy@yelpcamp-zn65v.mongodb.net/linter?retryWrites=true&w=majority";

// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });
// mongoose.connection.on('connected', () => {
//     console.log('connected to database ' + db);
// });

// mongoose.connection.on('error', (err) => {
//     console.log('database error ' + err);
// });

mongoose.connect("mongodb://localhost:27017/design", {
    useNewUrlParser: true
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

var students = {

    1: "mark",
    2: "tom",
    3: "john"
}




app.get("/", (req, res) => {
    res.render("landing")
});


app.get("/designs", (req, res) => {
    Design.find({}, function (err, allDesigns) {
        if (err) {
            console.log(err);

        } else {
            res.render("designsDir/index", {
                allDesigns: allDesigns
            });
        }
    });
});


app.get("/students/:id", (req, res) => {
    res.render("students", {
        name: students[req.params.id],
        id: req.params.id
    });
});

// when creatin a Form, the action will be the routes of the index

app.post("/designs", (req, res) => {
    Design.create(req.body.newDesign, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("designs");

        }
    });
    //redirected to d get route.
});

app.get("/designs/new", (req, res) => {
    res.render("designsDir/new");
})

///above route is for d form to be posted, 
//whose name is new.ejs

//show route
app.get("/designs/:id", (req, res) => {
//.populate.exec is to ref/ associate comments with the designs 
    Design.findById(req.params.id).populate("comments").exec((err, foundDesign) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundDesign, "designs found");
            res.render("designsDir/show", {
                foundDesign: foundDesign
            });

        }
    });
});


app.get("/designs/:id/edit", (req, res) =>{
    
        res.render("designsDir/edit")
    

});





app.delete("/designs/:id", (req, res) => {
    Design.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("designsDir/index")
        } else {
            res.redirect("designsDir/index")

        }
    })
})

// when creating a Form, two tins are involved: 
//the form (designs/:id/comments/new)..GET and 
//(designs/:id/comments).POST

// =======COMMENT ROUTES============
app.get("/designs/:id/comments/new", (req, res) => {
    Design.findById(req.params.id, (err, foundComment) => {
        if (err) {
            console.log(err)
        } else {
            res.render("commentsDir/newComments", {
                foundComment: foundComment
            });

        }
    })
});



app.post("/designs/:id/comments", (req, res) => {
    // res.send("new  comment")
    // lookup designs using ID 
    Design.findById(req.params.id, (err, design) => {
        if (err) {
            console.log(err)
            res.redirect("/designs")
        } else {
            //create a new comment

            Comment.create(req.body.newComment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    design.comments.push(comment);

                    design.save();
                    console.log("comment created and saved")
                    res.redirect("/designs/" + design._id);
                }

            });
        }

    });
});


const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Port ${port} is listening..... `)
});