var cheerio = require("cheerio");
var axios = require("axios");
var request = require("request")


var scrape = function (callback){
    request("https://www.nytimes.com", function(error, res, body){
        var $ = cheerio.load(body);
        var articles = [];
        $(".theme-summary").each(function(i, element){
            console.log("test grab")
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim()
            console.log(head)
            console.log(sum)
        if(head && link){
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim()
            var linkNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim()
            var dataToAdd = {
                headline: headNeat,
                summary: linkNeat
            }
            articles.push(dataToAdd);
        }
    })
    callback(articles)
})
}
module.exports = scrape