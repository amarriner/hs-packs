
var unirest = require("unirest");
var mashape = require("./mashape.json");

unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
    .header("X-Mashape-Key", mashape.key)
    .end(function (result) {
        console.log(JSON.stringify(result.body));
   });
