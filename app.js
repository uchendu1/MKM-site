var express = require('express');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

var students = {

    1: "mark",
    2: "tom",
    3: "john"
}

var designs = [{
        name: "free knitting pattern",
        image: "https://bit.ly/3gDKdlO"
    },
    {
        name: "wooly cap",
        image: "https://bit.ly/31GMGri"
    },
    {
        name: "baby cap",
        image: "https://bit.ly/31JcNxP"
    },

    {
        name: "wine colored cap",
        image: "https://bit.ly/2ETWipD"
    },

    {
        name: "warm knitted cap",
        image: "https://bit.ly/3hL8ZBH"
    },
    {
        name: "knitted face cap",
        image: "https://bit.ly/3lCvUBR"
    }


]


app.get("/", (req, res) => {
    res.render("landing")
});


app.get("/designs", (req, res) => {


    res.render("designs", {
        designs: designs
    });

});


app.get("/students/:id", (req, res) => {
    res.render("students", {
        name: students[req.params.id],
        id: req.params.id
    });
});


app.post("/designs", (req, res) => {
    // get data from form and add d array of designs
    var name = req.body.name;
    var image = req.body.image;
    var newDesign = {
        name: name,
        image: image
    };
    designs.push(newDesign)
    res.redirect("/designs");
    //redirected to d get route.
});

app.get("/designs/new", (req, res) => {
    res.render("new");
})

///above route is for d form to be posted, 
//whose name is new.ejs(file )name, to 


const port = 3000;
app.listen(port, () => {
    console.log(`Port ${port} is listening..... `)
});