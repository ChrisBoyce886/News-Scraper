//  Require mongoose
var mongoose = require("mongoose");

// Use Mongoose schema function to create new schema
var Schema = mongoose.Schema;

var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

// Create model for headlines
var Headline = mongoose.model("Headline", headlineSchema)
// Export Headline
module.exports = Headline