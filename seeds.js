var mongoose = require("mongoose");
var Design = require("./models/design");
var Comment = require("./models/comment");



var Data = [{
        name: "free knitting pattern",
        image: "https://bit.ly/3gDKdlO",
        description: "medium, with a pony tail. black colour"
    },
    {
        name: "wooly cap",
        image: "https://bit.ly/31GMGri",
        description: "small, i want no pony tail, pink colour "

    },
    {
        name: "baby cap",
        image: "https://bit.ly/31JcNxP",
        description: "extra small, with a black pony tail, gold colour,"

    }

]



function seedDB() {
    //remove all designs
    Design.remove({}, (err)=>{
        if(err){
            console.log(err)
        }
        console.log('design removed!')

        Data.forEach((seeded)=>{
            Design.create(seeded, (err, createdData)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log("added a new design, no error");
                    // ==========================
                    Comment.create({
                        text: "This is an awesome cap",
                         author: "linda"
                    }, (err, comment)=>{
                        if(err){
                            console.log(err)
                        } else {
//comments below is from the comment model
                            createdData.comments.push(comment)  
                            createdData.save();  
                            console.log("created new comment")
                        }
                    
                    }) 

                }
    
            });
    
        });
    

    });

    //add designs
    
}




module.exports = seedDB;