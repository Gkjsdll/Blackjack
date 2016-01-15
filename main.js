$(document).ready(function(){
  var cards = {deck: [], player: [], dealer:[]};
  var preload = {images: []};
  var hideFun = {};

  var $dealerHand = $('#dealerHand');
  var $playerHand = $('#playerHand');

  for(var i = 1; i <= 13; i++){
    preload.images.push(new Image().src = "cards/"+i+"clubs.png");
    preload.images.push(new Image().src = "cards/"+i+"diamonds.png");
    preload.images.push(new Image().src = "cards/"+i+"hearts.png");
    preload.images.push(new Image().src = "cards/"+i+"spades.png");
  }
  preload.images.push(new Image().src = "cards/cardBack.png");

  cards.draw = function(){
    return _.flatten(cards.deck.splice(_.random(0, cards.deck.length-1), 1));
  };

  hideFun.newDeck = function(){
    cards.deck = [];
    for(var i = 1; i < 14; i++){
      cards.deck.push([i, 1]);
      cards.deck.push([i, 2]);
      cards.deck.push([i, 3]);
      cards.deck.push([i, 4]);
    }
  }

  hideFun.clearHands = function(){
    cards.dealer = [];
    cards.player = [];
  }

  hideFun.clearTable = function(){
    $('.gameArea .card').remove();
  }

  hideFun.popTable = function(){
    var dealerCards = [];
    cards.dealer.forEach(function(card, index){
      if(index === 0){
        var cardImg = preload.images[52];
      }
      else{
        var cardImg = preload.images[4*(card[0]-1)+(card[1]-1)]; //math is awesome
      }
      var $card = $('<img>').attr('src', cardImg).addClass('card');
      dealerCards.push($card);
    });
    $dealerHand.append(dealerCards);

    var playerCards = [];
    cards.player.forEach(function(card){
      var cardImg = preload.images[4*(card[0]-1)+(card[1]-1)]; //math is awesome
      var $card = $('<img>').attr('src', cardImg).addClass('card');
      playerCards.push($card);
    });
    $playerHand.append(playerCards);
  }

  hideFun.hit = function(who, count){
    count = typeof count !== 'undefined' ?  count : 1;
    if(count > cards.deck.length){
      hideFun.hit(who, (count-cards.deck.length)); //If there are not enough cards in the deck, draw the cards then shuffle to draw the rest
    }
    for(var i = 0; i < count; i++){
      cards[who].push(cards.draw());
    }
  }

  newGame = function(){
    hideFun.newDeck();
    hideFun.clearHands();
    hideFun.clearTable();
    hideFun.hit("dealer", 2);
    hideFun.hit("player", 2);
    hideFun.popTable();
  }


  newGame();

  $('#newGame').click(newGame);

  debugger;

});
