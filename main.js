"use strict";

$(document).ready(function(){
  var cards = {deck: [], player: [], dealer:[]};
  var preload = {images: []};
  var hideFun = {};

  var $dealerHand = $('#dealerHand');
  var $playerHand = $('#playerHand');
  var $gameOverMessage = $('#gameOverMessage');
  var $gameCover = $('#gameCover');


  var gameOver = false;

  for(var i = 1; i <= 13; i++){
    preload.images.push(new Image().src = "cards/"+i+"clubs.png");
    preload.images.push(new Image().src = "cards/"+i+"diamonds.png");
    preload.images.push(new Image().src = "cards/"+i+"hearts.png");
    preload.images.push(new Image().src = "cards/"+i+"spades.png");
  }
  preload.images.push(new Image().src = "cards/cardback.png");

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

  hideFun.disco = function(){
    var discoCade1 = $('<img>').attr('src', 'discoCade_fullSpeed.gif').addClass('cade').css("margin-left", "-400px");
    var discoCade2 = $('<img>').attr('src', 'discoCade_fullSpeed.gif').addClass('cade').css("margin-left", "282px");
    $gameCover.prepend(discoCade1);
    $gameCover.append(discoCade2);
  }

  hideFun.dealerReveal = function(){
    var cardFace = preload.images[4*cards.dealer[0][0]+cards.dealer[0][1]];
    $dealerHand.children().first().attr('src', cardFace);
  };

  hideFun.getWinner = function(){ //draw 21 initially player wins, even draw is called push always a tie, if player busts dealer's card does not need to be revealed
    hideFun.dealerReveal();
    while(hideFun.scoreCheck("dealer") < 17){
      var card = cards.draw();
      cards["dealer"].push(card);
      var $card = $('<img>').attr('src', preload.images[4*card[0]+card[1]]).addClass('card no-select'); //replace this with separate method
      $dealerHand.append($card);
    }
    var playerScore = hideFun.scoreCheck("player");
    var dealerScore = hideFun.scoreCheck("dealer");
    if(playerScore === 21){
      console.log("player cards", cards.player.length);
      if(cards.player.length > 2){
        if(dealerScore !== 21){
          $gameOverMessage.text("Player Blackjack!");
          hideFun.disco();
        }
        else{
          $gameOverMessage.text("Double Blackjack!");
          hideFun.disco();
        }
      }
      else{
        $gameOverMessage.text("Player Blackjack!");
        hideFun.disco();
      }
    }
    else if(dealerScore === 21){
      $gameOverMessage.text("Dealer Blackjack!");
    }
    else if(playerScore > 21){
      $gameOverMessage.text("Dealer Wins!");
    }
    else if(dealerScore > 21){
      $gameOverMessage.text("Player Wins!");
    }
    else if(playerScore > dealerScore){
      $gameOverMessage.text("Player Wins!");
    }
    else if(playerScore === dealerScore){
      $gameOverMessage.text("It's a draw!");
    }
    else{
      $gameOverMessage.text("Dealer Wins!");
    }
    $gameCover.css("display", "block");
    gameOver = true;
  };

  hideFun.scoreCheck = function(who){
    var aces = [];
    var handSum = 0;
    cards[who].forEach(function(card, index){
      if(card[0] === 0){
        handSum += 11;
        aces.push(index);
      }
      else{
        if(card[0] >= 9)
        {
          handSum += 10;
        }
        else{
          handSum += card[0]+1;
        }
      };
    });
    if(handSum === 21){
      gameOver = true;
    }
    else if (handSum > 21){
      if(aces.length > 0){
        for(var i = (aces.length-1); i >= 0; i--){ //decrease value of ace
          handSum -= 10;
          aces.pop();
          if(handSum <= 21){
            i = -1;
          }
          else if (i === 0){
            gameOver = true;
          }
        }
        if(handSum === 21){
          gameOver = true;
        }
      }
      else{
        gameOver = true;
      }
    }
    console.log(handSum);
    debugger;
    return handSum;
  }

  hideFun.hit = function(){
    if(!gameOver){
      var card = cards.draw();
      cards["player"].push(card);
      var $card = $('<img>').attr('src', preload.images[4*card[0]+card[1]]).addClass('card'); //replace this with separate method
      $playerHand.append($card);
      if(hideFun.scoreCheck("player") >= 21) hideFun.getWinner();
    }
  }

  hideFun.stay = function(){
    if(!gameOver){
      hideFun.getWinner();
    }
  }

  hideFun.newGame = function(){
    hideFun.newDeck();
    hideFun.clearHands();
    hideFun.clearTable();
    hideFun.initHands();
    hideFun.popTable();
    $gameCover.css("display", "none");
    $gameCover.find('img').remove();
    gameOver = false;
    if(hideFun.scoreCheck("player") === 21){
      hideFun.getWinner();
    }
  }

  $('#newGame').click(hideFun.newGame);
  $('#hit').click(hideFun.hit);
  $('#stay').click(hideFun.stay);
  $gameCover.click(function(e){
    e.stopPropagation();
    $gameCover.css("display", "none");
    hideFun.newGame();
  });

  hideFun.newGame();
});
