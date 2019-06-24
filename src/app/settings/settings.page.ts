import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { STATUSES } from '../constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private storage: Storage,
    private router: Router) { }

  reset() {
    this.storage.get('progress').then(progress => {
      progress.forEach(deck => {
        deck.cards.forEach(card => {
          card.status = STATUSES.UNSEEN;
          card.knewCount = 0;
        });
      });
      this.storage.set('progress', progress).then(() => this.router.navigate(['/home']));
    });
  }

  ngOnInit() {
  }

}
