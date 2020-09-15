var mongoose = require("mongoose");
var Design = require("./models/design");
var Comment = require("./models/comment");



var Data = [{
        name: "free knitting pattern",
        image: "https://bit.ly/3gDKdlO",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
    },
    {
        name: "wooly cap",
        image: "https://bit.ly/31GMGri",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo "

    },
    {
        name: "baby cap",
        image: "https://bit.ly/31JcNxP",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"

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