import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProductPage } from '../product/product';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, private toastCtrl: ToastController) {
    try {
      this.updateProducts()
    } catch (error) {
      alert(JSON.stringify(error))
    }
    
  }

  openProduct(product) {
    this.navCtrl.push(ProductPage, {'product': product})
  }

  private async updateProducts() {
    try {
      if (await this.dataProvider.isUpToDate()) {
        this.presentToast("Mise à jour effectuée !")
        await this.dataProvider.updateLocal()
        await this.dataProvider.getProducts()
      } else {
        if (await this.dataProvider.getEditInProgress()) {
          this.presentToast("Modification en cours ! Gestion dans la page Synchronisation")
        }
        else{
          this.presentToast("Aucune mise à jour !")
        }        
        await this.dataProvider.getProducts()
      }
    } catch (error) {
      this.presentToast("Une erreur s'est produite !")
    }
  }

  private resetDate() {
    this.dataProvider.setLastUpdate(new Date('2015-01-01 12:00:00'))
  }

  async doRefresh(refresher) {
    try {
      await this.updateProducts()
      refresher.complete()
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  presentToast(givemessage) {
    let toast = this.toastCtrl.create({
      message: givemessage,
      duration: 3000,
    });

    toast.present()
  }

}
