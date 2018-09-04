"use strict";

let TrelloAPI = require('./trello-api.js');

window.onload = () => {
    TrelloAPI.init('your api key', 'your token');
}

