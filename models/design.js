
// =======schema setup=================
var mongoose = require('mongoose');
var designSchema = new mongoose.Schema({
    name: String,
    image:  String,
    description: String,
    comments : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

// var Design = mongoose.model("Design", designSchema);
module.exports = mongoose.model("Design", designSchema);