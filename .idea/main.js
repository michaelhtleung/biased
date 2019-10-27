
// All you have to do is call this method ---> getParagraphArray("Some Company Name Here")
function getParagraphArray(companyName) {
    var Crawler = require("crawler");
    var c = new Crawler({
        maxConnections: 10,
        callback: function (error, res, done) {
            var paragraphArray;
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                paragraphArray = $("p").text().split("\n")
            }
            checkForKeywords(paragraphArray)
            done();
        }
    });
    // Queue just one URL, with default callback
    c.queue('https://en.wikipedia.org/wiki/' + companyName);
}

function checkForKeywords(paragraphArray) {
    for (var i = 0; i < paragraphArray.length; i++) {
        foundKeywordsArray = new Array()
        for (var j = 0; j < keywordArray.length; j++) {
            if ((paragraphArray[i].includes(keywordArray[j]) || (paragraphArray[i].includes(keywordArray[j].toLowerCase())))) {
                foundKeywordsArray = paragraphArray[i]
                console.log(foundKeywordsArray + "\n")
            }
        }
    }
    return foundKeywordsArray
}

var keywordArray = ["Animal testing", "Factory farming", "Animal rights", "Cruelty", "Environment", "Climate change",
    "Pollution", "Toxin", "Habitats", "Resources", "Palm oil", "Human rights", "Irresponsible", "Military",
    "Anti-social", "Finance", "Boycott", "Controversial", "Technology", "Political", "Ethos", "Product",
    "Sustainability", "Organic", "Fair-trade", "Energy", "Efficient", "Vegan", "Vegetarian"]
