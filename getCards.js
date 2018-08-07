
var unirest = require("unirest");
var mashape = require("./mashape.json");

unirest.get("https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json")
    .end(function (result) {
        console.log(JSON.stringify(result.body));
   });
