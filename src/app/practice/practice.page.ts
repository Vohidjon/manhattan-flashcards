import { STATUSES } from './../constants';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {
  progress: any;
  deck: any;
  activeCard: any;
  flipped = false;
  statusStyles = [{
    title: 'New',
    color: 'light'
  }, {
    title: 'Reviewing',
    color: 'warning'
  }, {
    title: 'Learning',
    color: 'danger'
  }, {
    title: 'Mastered',
    color: 'success'
  }]
  constructor(private activatedRoute: ActivatedRoute,
    private storage: Storage) {
    this.storage.get('progress').then(progress => {
      this.progress = progress;
      this.deck = progress[this.activatedRoute.snapshot.paramMap.get('index')];
      this.next();
    });
  }

  flip() {
    this.flipped = true;
  }

  knew() {
    console.log('------------------------------------------------');
    console.log('KNOW');
    this.activeCard.knewCount++;
    console.log(this.activeCard.word + ": " + this.statusStyles[this.activeCard.status - 1].title + ", knewCount: " + this.activeCard.knewCount);
    if((this.activeCard.status == STATUSES.MASTERED) || (this.activeCard.status == STATUSES.UNSEEN) || (this.activeCard.knewCount == 4)) {
      this.activeCard.status = STATUSES.MASTERED;
    } else {
      this.activeCard.status = STATUSES.REVIEWING;
    }
    console.log('TO ' + this.statusStyles[this.activeCard.status - 1].title);
    console.log('------------------------------------------------');
    this.next();
    this.flipped = false;
  }
  
  noknew() {
    console.log('------------------------------------------------');
    console.log('KNOW');
    console.log(this.activeCard.word + ": " + this.statusStyles[this.activeCard.status - 1].title + ", knewCount: " + this.activeCard.knewCount);
    this.activeCard.status = STATUSES.LEARNING;
    this.activeCard.knewCount = 0;
    console.log('TO ' + this.statusStyles[this.activeCard.status - 1].title);
    console.log('------------------------------------------------');
    this.next();
    this.flipped = false;
  }

  next() {
    let unseen = this.deck.cards.filter(card => card.status == STATUSES.UNSEEN);
    let reviewing = this.deck.cards.filter(card => card.status == STATUSES.REVIEWING);
    let learning = this.deck.cards.filter(card => card.status == STATUSES.LEARNING);
    let mastered = this.deck.cards.filter(card => card.status == STATUSES.MASTERED);
    let cats = [unseen, reviewing, learning, mastered];
    var nextCard = null;
    do {
      let cat = cats[parseInt((Math.random() * 4).toString())];
      if(cat.length > 0) {
        let card = cat[parseInt((Math.random() * cat.length).toString())]
        if(card != this.activeCard) nextCard = card;
      }
    } while (nextCard == null);

    this.activeCard = nextCard;
    
    // saving to storage
    this.storage.set('progress', this.progress);
  }

  masteredCount () {
    return this.deck.cards.filter(card => card.status == STATUSES.MASTERED).length;
  }

  reviewingCount () {
    return this.deck.cards.filter(card => card.status == STATUSES.REVIEWING).length;
  }

  learningCount () {
    return this.deck.cards.filter(card => card.status == STATUSES.LEARNING).length;
  }

  ngOnInit() {
  }

}
