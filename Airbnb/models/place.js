var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
var lodash = require('lodash');

module.exports.getList = function getList () {
    return  [
        {
            id:1,
            price:"300€/j",
            note:"9/10",
            name:"Hotel de la place du devloppeur",
            description: "Je suis un superbe hotel !",
            location: {x:22.279807,y:114.174464},
        },
        {
            id:2,
            price:"100€/j",
            note:"8/10",
            name:"Auberge du jeune devloppeur",
            description: "Ici on bois et on code !",
            location: {x:72.497597,y:-23.938792},
        },
        {
            id:3,
            price:"1€/j",
            note:"0/10",
            name:"Devloppeur C#",
            description: "Vite je post avant un ecran bl...",
            location: {x:44.338666,y:1.211126 },
        },
    ];
};

module.exports.getPlace = function(id) {
    listPlace = module.exports.getList();
    return lodash.filter(listPlace, { "id": parseInt(id) })[0];
}