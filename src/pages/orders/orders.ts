import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, private toastCtrl: ToastController) {
    this.update()
  }

  private async update() {
    try {
      await this.dataProvider.getOrders()
    } catch (error) {
      this.presentToast("Une erreur s'est produite !")
    }
  }

  private resetDate() {
    this.dataProvider.setLastUpdate(new Date('2015-01-01 12:00:00'))
  }

  async doRefresh(refresher) {
    try {
      await this.update()
      refresher.complete()
    } catch (error) {
      this.presentToast("Une erreur s'est produite !")
    }
  }

  presentToast(givemessage) {
    let toast = this.toastCtrl.create({
      message: givemessage,
      duration: 3000,
    });

    toast.present()
  }

  // Delete an order
  async deleteOrder(order) {
    try {
      await this.dataProvider.deleteOrder(order)
      await this.update()
    } catch (error) {
      this.presentToast("Une erreur s'est produite !")
    }
  }

}
