
var fs = require("fs");
var request = require("sync-request");
var cards = require("./json/cards.json");

var delimiter = "|"
var packNumber = 1398;
var formulas = [
    '=IF(C5516 <> "", VLOOKUP(C5516, Collection!$B$2:$H, 2, FALSE),"")',
    '0',
    '=IF(C5516 <> "", VLOOKUP(C5516, Collection!$B$2:$H, 3, FALSE),"")',
    'Gold',
    '=IF(C5516 <> "", IF(E5516=1, VLOOKUP(D5516, Tables!$A$2:$D$5, 4, FALSE), VLOOKUP(D5516, Tables!$A$2:$D$5, 3, FALSE)), "")'
]
var log = fs.readFileSync("C:\\Program Files (x86)\\Hearthstone\\Logs\\Achievements.log", "utf-8").toString().split("\n");
var today = new Date();
today = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

function getCard(id) {

    for (set in cards) {
        for (var i = 0; i < cards[set].length; i++) {

            var card = cards[set][i];

            if (card.cardId == id) {
                return card;
            }

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
