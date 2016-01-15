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
    for(var i = 0; i < 13; i++){
      cards.deck.push([i, 0]);
      cards.deck.push([i, 1]);
      cards.deck.push([i, 2]);
      cards.deck.push([i, 3]);
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
      console.log(card);
      if(index === 0){
        var cardImg = preload.images[52];
      }
      else{
        var cardImg = preload.images[4*card[0]+card[1]]; //math is awesome
      }
      var $card = $('<img>').attr('src', cardImg).addClass('card');
      dealerCards.push($card);
    });
    $dealerHand.append(dealerCards);

    var playerCards = [];
    cards.player.forEach(function(card){
      console.log(card);
      var cardImg = preload.images[4*card[0]+card[1]]; //math is awesome
      var $card = $('<img>').attr('src', cardImg).addClass('card');
      playerCards.push($card);
    });
    $playerHand.append(playerCards);
  }

  hideFun.initHands = function(){
      cards["player"].push(cards.draw(), cards.draw());
      cards["dealer"].push(cards.draw(), cards.draw());
  }

  hideFun.playerCheck = function(){
    //check if player's hand >= 21
  }

  hideFun.dealerCheck = function(){
    //check if dealer's hand >= 21
    //else if dealer's hand < 17 hit
    //else eval dealers hand vs player's hand
  }

  hideFun.hit = function(){
    var card = cards.draw();
    cards["player"].push(card);
    var $card = $('<img>').attr('src', preload.images[4*card[0]+card[1]]).addClass('card'); //replace this with separate method
    $playerHand.append($card);
  }

  newGame = function(){
    hideFun.newDeck();
    hideFun.clearHands();
    hideFun.clearTable();
    hideFun.initHands();
    hideFun.popTable();
  }

  $('#newGame').click(newGame);

  $('#hit').click(hideFun.hit);
  $('#stay').click(hideFun.stay);

  newGame();
  debugger;

});
