$(document).ready(function(){
  var cards = {stored: {deck: [], playerHand: [], dealerHand:[]}};
  var preload = {cardBacks: [new Image().src = "cards/cardBack.png"]};

  for(var i = 1; i <= 13; i++){
    preload.cardBacks.push(new Image().src = "cards/"+i+"clubs.png");
    preload.cardBacks.push(new Image().src = "cards/"+i+"diamonds.png");
    preload.cardBacks.push(new Image().src = "cards/"+i+"hearts.png");
    preload.cardBacks.push(new Image().src = "cards/"+i+"spades.png");
  }

  cards.draw = function(){
    return cards.stored.deck.splice(_.random(0, cards.stored.deck.length-1), 1);
  };

  cards.newDeck = function(){
    cards.stored.deck = [];
    for(var i = 1; i < 14; i++){
      cards.stored.deck.push(i, i, i, i);
    }
  }

  cards.newDeck();
  // cards.hand.push();

  debugger;

});
