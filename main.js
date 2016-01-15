$(document).ready(function(){
  var cards = {deck: [], playerHand: [], dealerHand:[]};
  var preload = {cardBacks: [new Image().src = "cards/cardBack.png"]};

  for(var i = 1; i <= 13; i++){
    preload.cardBacks.push(new Image().src = "cards/"+i+"clubs.png");
    preload.cardBacks.push(new Image().src = "cards/"+i+"diamonds.png");
    preload.cardBacks.push(new Image().src = "cards/"+i+"hearts.png");
    preload.cardBacks.push(new Image().src = "cards/"+i+"spades.png");
  }

  cards.draw = function(){
    return Number(cards.deck.splice(_.random(0, cards.deck.length-1), 1));
  }; //

  newDeck = function(){
    cards.deck = [];
    for(var i = 1; i < 14; i++){
      cards.deck.push(i, i, i, i);
    }
  }

  clearHands = function(){
    cards.dealerHand = [];
    cards.playerHand = [];
  }

  hit = function(who, count){
    count = typeof count !== 'undefined' ?  count : 1;
    for(var i = 0; i < count; i++){
      cards[who+"Hand"].push(cards.draw());
    }
  }

  newGame = function(){
    newDeck();
    clearHands();
    hit("dealer", 2);
    hit("player", 2);
  }

  newGame();

  debugger;

});
