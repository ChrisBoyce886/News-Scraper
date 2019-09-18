var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
var Headline = require("../models/Headline");

module.exports = {
    fetch: function (callback){
        scrape(function(data){
            var articles = data;
            for (i = 0; i < articles.length; i++){
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, {ordered:false}, function(error, docs){
                callback(error, docs);
            });
        });
    },
    delete: function(query, callback){
        Headline.remove(query, callback);
    },
    get: function(query, callback){
        Headline.find(query).sort({_id:-1}).exec(function(error, doc){
            callback(doc);
        });
    },
    update: function(query, callback){
        Headline.update({_id: query.id}, {
            $set: query
        }, {}, callback)
    }
}