import Card from './Card.js';
import Hand from './Hand.js'

//Author: Ben Martinson

export default class Hands{
  constructor(arrOfHands){

    this.arrOfHands = [new Hand([])];

    this.findFullHouse = this.findFullHouse.bind(this);
    this.find4Kind = this.find4Kind.bind(this);
    this.find3Pair = this.find3Pair.bind(this);
    this.find2Pair = this.find2Pair.bind(this);
    this.findPair = this.findPair.bind(this);
    this.findHighCard = this.findHighCard.bind(this);

    this.hands = [[this.findFullHouse, "Full House"],[this.find4Kind, "4 of a Kind"] ,[this.find3Pair, "3 of a Kind"],
                  [this.find2Pair, "Two Pair"], [this.findPair, "Pair"], [this.findHighCard, "High Card"]];


    this.findBestHands();
  }


  findBestHand(hand){
    for (let i = 0; i < this.hands.length; i++) {
      let result = this.hands[i][0](hand);

      hand.message = this.hands[i][1];
      if(result.length !== 0){
        hand.bestHand = result;
        return;
      }
    }
  }

  findPair(hand){
    for (let i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 2){
        return [i, i];
      }
    }
    return [];
  }

  find2Pair(hand){
    let firstPair;
    let secondPair;

    for (let i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 2){
        if(firstPair){
          return [firstPair, [i, i]];
        } else {
          firstPair = [i, i];
        }
      }
    }
    return [];
  }

  find3Pair(hand){
    for (var i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 3){
        return [i, i, i];
      }
    }
    return [];
  }

  find4Kind(hand){
    for (var i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 4){
        return [i, i, i, i];
      }
    }
    return [];
  }


  findBestHands(){
    let handResults = []
    this.arrOfHands.forEach(function(hand){
      this.findBestHand(hand);
    }, this)
    console.log(this.arrOfHands);
  }


  findFullHouse(hand){
    let threePair = this.find3Pair(hand);
    let pair = this.findPair(hand);
    console.log(threePair, pair);
    if(threePair.length && pair.length)
      return [threePair, pair];
    return [];
  }


  findHighCard(hand){
    for (var i = hand.counts.length; i > 0; i--) {
      if(hand.counts[i] > 0)
        return i;
    }
    return [];
  }

}
