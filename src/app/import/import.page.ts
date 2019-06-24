import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { STATUSES } from '../constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  model = {
    title: "",
    dataStr: ""
  }

  errorMessage = null;

  constructor(private storage: Storage,
    private router: Router) { }

  createDeck() {
    this.errorMessage = null;
    if(!this.model.title) {
      this.errorMessage = "Title cannot be blank";
      return;
    }

    if(!this.model.dataStr) {
      this.errorMessage = "Data cannot be empty";
      return;
    }

    let rows = this.model.dataStr.trim().split('<<line>>').filter(row => row.trim()).map(row => row.split('<<word>>'));
    // validate
    for(var i = 0; i < rows.length; i++) {
      if(rows[i].length != 2) {
        this.errorMessage = "Invalid data format";
        return;
      }
    }

    // must have at least two words
    if(rows.length < 2) {
      this.errorMessage = "Must have at least 2 words";
      return;
    }
    let deck = {
      deck: this.model.title,
      cards: rows.map(row => {
        return {
          word: row[0],
          def: row[1],
          status: STATUSES.UNSEEN,
          knewCount: 0
        };
      })
    };
    this.storage.get('progress').then(progress => {
      progress.push(deck);
      this.storage.set('progress', progress).then(() => this.router.navigate(['/home']));
    });
  }

  ngOnInit() {
  }

  viewWillEnter() {
    this.model.title = "";
    this.model.title = null;
  }

}
