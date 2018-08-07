
var fs = require("fs");
var request = require("sync-request");
var cards = require("./json/cards.json");

var delimiter = "|"
var packNumber = 1511;
var log = fs.readFileSync("C:\\Program Files (x86)\\Hearthstone\\Logs\\Achievements.log", "utf-8").toString().split("\n");
var today = new Date();
today = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

function getCard(id) {

    for (j in cards) {
        var card = cards[j];

        if (card.id == id) {
            return card;
        }

    }

    return {};

}

var numberOfCards = 0;
for (var i = 0; i < log.length; i++) {

    var line = log[i];
    var cardGained = /NotifyOfCardGained/;
    var cardId = /cardId=([0-9a-zA-Z_]*)/;
    var golden = /GOLDEN/;

    if (line.search(cardGained) >= 0) {

        var id = cardId.exec(line)[1];
        var gold = 0;
        if (line.search(golden) >= 0) {
            gold = 1;            
        }
        
        console.log(today + delimiter + packNumber + delimiter + getCard(id).name + delimiter + gold);
        
        numberOfCards++;
        
        if (numberOfCards === 5) {
            numberOfCards = 0;
            packNumber++;
        }

    }

}
