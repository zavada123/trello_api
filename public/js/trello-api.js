//*API TRELLO*//
var TrelloAPI = (function() {
    let key, token;

    function init(keyInit, tokenInit) {
        key = keyInit;
        token = tokenInit;

        document.querySelector('section').style.height = window.innerHeight;
        document.querySelector('button').addEventListener('click', () => {
            document.querySelector('.js-boardlist__items').innerHTML = '';
            renderBoard()
        });
    }

    function groupedCardsyId(cards) {
        let groupedCards = {};
        for (let card of cards) {
            if (groupedCards[card.idList] === undefined) groupedCards[card.idList] = [];
            groupedCards[card.idList].push(card);
        }
        return groupedCards;
    }

    function renderBoard() {
        getBoardListByid().then(board => {
            document.querySelector('.js-boardName').innerText = board.name;
            let res = groupedCardsyId(board.cards);
            let i = 0;
            for (let list of board.lists) {
                let countCards = res[list.id] ? res[list.id].length : 0;
                document.querySelector('.js-boardlist__items').innerHTML += `<div class="boardlist__item js-boardlist__item"><div class="list__item js-list__item"><div class="list__name .js-list__name">${list.name}</div><div class="card__count js-card__count"><span>${countCards}</span></div></div><div class="card__items js-card__items">`;
                for (let card of board.cards) {
                    if (card.idList == list.id) {
                        document.querySelectorAll('.js-card__items')[i].innerHTML += `<div class="card__item js-card__item"> <div class="card__name js-card__name"> ${card.name} <div class="card__description js-card__description">${card.desc}</div></div></div>`;
                    }
                }
                document.querySelector('.js-boardlist__items').innerHTML += '</div></div>'
                i++;
            }
            let boardList = document.querySelectorAll('.js-boardlist__item');
            let listItem = document.querySelectorAll('.js-list__item');
            listItem.forEach((element, key) => {
                element.addEventListener('click', function() {
                    boardList[key].classList.toggle('active');
                });
            });
        })
    }

    function getBoardListByid() {
        let id = document.getElementById('boardID').value;
        return fetch("https://api.trello.com/1/boards/" + id + "?cards=open&lists=open&key=" + key + "&token=" + token, { mode: 'cors' })
            .then(response => { return response.json() })
    }

    return {
        init: init
    }
})();

module.exports = TrelloAPI;