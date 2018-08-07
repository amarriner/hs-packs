
var fs = require("fs");
var unirest = require("unirest");
var mashape = require("./mashape.json");

const jsonDir = "./json";

unirest.get("https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json")
    .end(function (result) {
        if (!fs.existsSync(jsonDir)) {
            fs.mkdirSync(jsonDir);
        }

        fs.writeFileSync("json/cards.json", JSON.stringify(result.body));
   });
