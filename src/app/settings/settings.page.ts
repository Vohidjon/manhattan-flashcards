import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private storage: Storage,
    private router: Router) { }

  reset() {
    this.storage.clear().then(() => this.router.navigate(['/home']));
  }

  ngOnInit() {
  }

}
