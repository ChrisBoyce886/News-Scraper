// Require scripts
var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
    // Find all notes associated with headline id
    get: function(data, callback){
        Note.find({ _headlineId: data._id
        }, callback);
    },
    // Take in callback and data from user
    save: function(data, callback){
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
        // Take note and create a new note
        Note.create(newNote, function(error, doc){
            if (error){
                console.log(error)
            } else {
                console.log(doc)
                callback(doc)
            }
        })
    },
    // Remove note from each article
    delete: function(data, callback){
        Note.remove({
            _id: data._id
        }, callback)
    }
};