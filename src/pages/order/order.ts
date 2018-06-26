import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Supplier } from '../../models/supplier';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from '../../models/order';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  product: Product
  supplier: Supplier
  order: Order
  orderForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController, private dataProvider: DataProvider) {
    this.product = navParams.get('product')
    this.supplier = navParams.get('supplier')
    this.order = new Order(0, this.product, 0, this.supplier, this.dataProvider.userName)
    this.initForm()
  }

  cancel() {
    this.initForm()
  }

  async save() {
    this.order.quantity = this.orderForm.controls.quantity.value
    this.dataProvider.orders.push(this.order)
    console.log(this.order)
    try {
      await this.dataProvider.setOrder(this.order)
      this.presentToast('Votre commande à été enregistrer avec succès')
    } catch (error) {
      this.presentToast('Une erreur est survenue')
    }
    // this.dataProvider.setEditInProgress(true)
    this.initForm()
  }

  ionViewCanLeave() {
    if (this.orderForm.dirty) {
      this.presentToast('Vous devez enregistrer ou annuler les modifications en cours.')
    }
    return !this.orderForm.dirty
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      quantity: [this.order.quantity],
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
    });

    toast.present()
  }

}
