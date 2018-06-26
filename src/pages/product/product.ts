import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { SupplierPage } from '../supplier/supplier'
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  product: Product
  productForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController, private dataProvider: DataProvider) {
    this.product = navParams.get('product')
    this.initForm()
  }

  cancel() {
    this.initForm()
  }

  save() {
    this.product.price = this.productForm.controls.price.value
    this.product.unit = this.productForm.controls.unit.value
    this.product.stock = this.productForm.controls.stock.value
    this.product.lowStockThreshold = this.productForm.controls.lowStockThreshold.value
    this.product.edited = true
    this.dataProvider.setProducts()
    this.dataProvider.setEditInProgress(true)
    this.initForm()
  }

  ionViewCanLeave() {
    if (this.productForm.dirty) {
      this.presentToast()
    }
    return !this.productForm.dirty
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      price: [this.product.price],
      unit: [this.product.unit],
      stock: [this.product.stock],
      lowStockThreshold: [this.product.lowStockThreshold]
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Vous devez enregistrer ou annuler les modifications en cours.',
      duration: 3000,
    });

    toast.present()
  }

  // Open page supplier
  // openSupplier(supplier) {
  //   this.navCtrl.push(SupplierPage, {'supplier': supplier})
  // }

  openOrder(supplier) {
    this.navCtrl.push(OrderPage, {'supplier': supplier, 'product': this.product})
  }
}
