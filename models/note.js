// Require Mongoose
var mongoose = require("mongoose");

// Use Mongoose schema function to create new schema
var Schema = mongoose.Schema
var noteSchema = new Schema ({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
})

// Create Model for notes
var Note = mongoose.model("note", noteSchema);
//Export
module.exports = Note