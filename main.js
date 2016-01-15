$(document).ready(function(){
  var cards = {stored: {deck: [], playerHand: [], dealerHand:[]}};

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
