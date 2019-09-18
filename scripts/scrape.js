// Require Axios and Cheerio
var cheerio = require("cheerio");
var axios = require("axios");

var scrape = function (callback){
    // Use Axios to pull from the Charlotte Observer website
    axios.get("https://www.charlotteobserver.com/").then(function(response) {
        //Set variable to hold Cheerio data
        var $ = cheerio.load(response.data);
        console.log("Scraping check 1....");
        var articles = [];
        // Find article html tags and classes for each article on the website
        $("article").each(function(i, element){
            console.log("Scraping check 2....");
            var headstart = $(this).children("div.package");       
            var headstart1 = headstart.children("h3");
            var linkstart = headstart1.children("a").attr("href");
            var head = headstart1.children("a").text();
                // If the article is found using above variables, trim and add to a variable
                if(head && linkstart){
                    var header = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    var link = linkstart.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    var dataToAdd = {
                        headline: header,
                        summary: link
                }
                // Push into an array
                articles.push(dataToAdd);
        }
    })
    callback(articles)
}) 
}
//Export scrape function 
module.exports = scrape