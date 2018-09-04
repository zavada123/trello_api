"use strict";

window.onload = () => {
    TrelloAPI.init('your api key', 'your token');
}

let TrelloAPI = require('./trello-api.js');