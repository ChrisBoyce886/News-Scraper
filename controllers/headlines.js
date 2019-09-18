// Require necessary js scripts
var scrape = require("../scripts/scrape.js");
var correctDate = require("../scripts/date.js");
var Headline = require("../models/headline.js");

module.exports = {
    // Pass callback into fetch function, run scrape function
    fetch: function (callback){
        scrape(function(data){
            var articles = data;
            // Loop through all articles set save to false for all of them and run correctDate function
            for (i = 0; i < articles.length; i++){
                articles[i].date = correctDate();
                articles[i].saved = false;
            }
            // Mongo function for all articles
            Headline.collection.insertMany(articles, {ordered:false}, function(error, docs){
                callback(error, docs);
            });
        });
    },
    // Delete an article
    delete: function(query, callback){
        Headline.remove(query, callback);
    },
    // Find all headlines in query, sort by most recent, pass docs to callback function
    get: function(query, callback){
        Headline.find(query).sort({_id:-1}).exec(function(error, doc){
            callback(doc);
        });
    },
    // Update new articles being scraped, updated information passed to those articles
    update: function(query, callback){
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, callback)
    }
};