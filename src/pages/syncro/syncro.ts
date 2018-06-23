import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SyncroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-syncro',
  templateUrl: 'syncro.html',
})
export class SyncroPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private toastCtrl: ToastController) {
    try {
      this.updateProducts()
    } catch (error) {
      alert(JSON.stringify(error))
    }
    
  }

  private async updateProducts() {
    try {
      if (await this.dataProvider.isUpToDate()) {
        console.log('update')
        await this.dataProvider.updateLocal()
        await this.dataProvider.getProducts()
      } else {
        console.log('Nupdate')
        await this.dataProvider.getProducts()
      }
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  async uploadData() {
    let updatedProducts = []
    for (let product of this.dataProvider.products) {
      if (product.edited) {
        updatedProducts.push(product)
      }
    }
    try{
      await this.dataProvider.setEditInProgress(false)
      await this.dataProvider.setProducts()
      await this.dataProvider.updateProducts(updatedProducts)
      for (let product of this.dataProvider.products) {
        if (product.edited) {
          product.edited = false
        }
      }
      this.presentToast("Eléments mis à jour !")
    } catch(error){
      this.presentToast("Il y a eu une erreur")
      console.log(error)
    }
    
  }

  cancelData(){
    this.dataProvider.updateLocal()
    this.presentToast("Eléments réinitialisés !")
  }

  presentToast(givemessage) {
    let toast = this.toastCtrl.create({
      message: givemessage,
      duration: 3000,
    });

    toast.present()
  }

}
