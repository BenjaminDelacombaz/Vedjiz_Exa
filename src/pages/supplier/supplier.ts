import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Supplier } from '../../models/supplier';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';

/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class SupplierPage {

  supplier: Supplier;
  supplierForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController, private dataProvider: DataProvider) {
    this.supplier = navParams.get('supplier')
    this.initForm()
  }

  save() {
    this.supplier.firstName = this.supplierForm.controls.firstName.value
    this.supplier.lastName = this.supplierForm.controls.lastName.value
    this.supplier.phone = this.supplierForm.controls.phone.value
    this.supplier.address = this.supplierForm.controls.address.value
    this.supplier.companyName = this.supplierForm.controls.companyName.value

    this.dataProvider.setProducts()
    this.initForm()
  }

  ionViewCanLeave() {
    if (this.supplierForm.dirty) {
      this.presentToast()
    }
    return !this.supplierForm.dirty
  }

  cancel() {
    this.initForm()
  }

  initForm() {
    this.supplierForm = this.formBuilder.group({
      firstName: [this.supplier.firstName],
      lastName: [this.supplier.lastName],
      phone: [this.supplier.phone],
      address: [this.supplier.address],
      companyName: [this.supplier.companyName]
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Vous devez enregistrer ou annuler les modifications en cours.',
      duration: 3000,
    });

    toast.present()
  } 

}
