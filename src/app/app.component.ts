import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Toast } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

import { HomePage } from '../pages/home/home';
import { SyncroPage } from '../pages/syncro/syncro';
import { SettingsPage } from '../pages/settings/settings';
import { OrdersPage } from '../pages/orders/orders'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, onlyAdmin: boolean}>

  constructor(private dataProvider: DataProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation and for all
    this.pages = [
      { title: 'Accueil', component: HomePage, onlyAdmin: false },
      { title: 'Synchronisation', component: SyncroPage, onlyAdmin: true },
      { title: 'Commandes', component: OrdersPage, onlyAdmin: false },
      { title: 'Paramètres', component: SettingsPage, onlyAdmin: false }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // Switch to another status
  async switchStatus(adminUser: boolean) {
    try{
      await this.dataProvider.setAdmin(adminUser)
    } catch(error) {
      alert(error)
    }
  }
}
