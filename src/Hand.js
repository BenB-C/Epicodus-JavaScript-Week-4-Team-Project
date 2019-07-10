import Card from './Card.js'

export default class Hand{
  constructor(cards){
    this.cards = []
    this.cards.push(new Card(cards[0], 'heart'));
    this.cards.push(new Card(cards[1], 'diamond'));
    this.cards.push(new Card(cards[2], 'heart'));
    this.cards.push(new Card(cards[3], 'heart'));
    this.cards.push(new Card(cards[4], 'heart'));


    this.draw = false;
    this.counts = []
    this.message = "None";
    this.bestHand = [];
    this.handRank = 0;
    this.winner = false;
    this.turnFaceIntoNums();
    this.getCounts();
    this.sortCards();
    console.log(this.cards);
  }
  
  getCounts(){
    for (var i = 0; i < 15; i++) {
      this.counts.push(0);
    }
    this.cards.forEach(function(card, idx){
      this.counts[card.value]++
    }, this)
  }


  turnFaceIntoNums(){
    //convert face Card values into numbers to use for straight and sorting
    const facesToNums = ["Jack", "Queen", "King", "Ace"];

    this.cards.map(function(card){
      for (var i = 0; i < facesToNums.length; i++) {
        if(card.value === facesToNums[i]){
          card.value = i+11;
        }
      }
    })
  }

  sortCards(){
    this.cards.sort((a, b) => { return a.value - b.value })
  }


}
