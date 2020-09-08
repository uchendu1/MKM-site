var express = require('express');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var Design = require("./models/design");
var seedDB = require("./seeds");





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




// Design.create({
//         name: "free knitting pattern",
//         image: "https://bit.ly/3gDKdlO",
//         size: "medium"
//     },
//     function (err, design) {
//         if (err) {
//             console.log(err);

//         } else {
//             console.log("NEWLY CREATED DESIGN: ")
//             console.log(design)
//         }
//     }
// )

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
            res.render("index", {
                designs: allDesigns
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


app.post("/designs", (req, res) => {

    //create a new design n save to DB 
    console.log(req.body);
    // req.body.newDesign.body = req.sanitize(req.body.newDesign.body);
    console.log("======================");

    console.log(req.body);

    Design.create(req.body.newDesign, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/designs");

        }
    });
    //redirected to d get route.
});

app.get("/designs/new", (req, res) => {
    res.render("new");
})

///above route is for d form to be posted, 
//whose name is new.ejs


app.get("/designs/:id", (req, res) => {

    Design.findById(req.params.id, (err, foundDesign) => {
        if (err) {
            console.log(err)
        } else {
            res.render("show", {
                uniqDesign: foundDesign
            });

        }
    })
});

app.delete("/designs/:id", (req, res) => {
    Design.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/index")
        } else {
            res.redirect("/index")

        }
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Port ${port} is listening..... `)
});





// var designs = [{
//         name: "free knitting pattern",
//         image: "https://bit.ly/3gDKdlO"
//     },
//     {
//         name: "wooly cap",
//         image: "https://bit.ly/31GMGri"
//     },
//     {
//         name: "baby cap",
//         image: "https://bit.ly/31JcNxP"
//     },

//     {
//         name: "wine colored cap",
//         image: "https://bit.ly/2ETWipD"
//     },

//     {
//         name: "warm knitted cap",
//         image: "https://bit.ly/3hL8ZBH"
//     },
//     {
//         name: "knitted face cap",
//         image: "https://bit.ly/3lCvUBR"
//     }


// ]