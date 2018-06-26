import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'
import { Supplier } from '../../models/supplier';
import { Order } from '../../models/order';
import { resolveDefinition } from '@angular/core/src/view/util';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  private endpoint: string = `http://vedjserver.mycpnv.ch/api/v1/`
  products: Array<Product> = []
  orders: Array<Order> = []
  status: string
  isAdmin: boolean
  userName: string

  constructor(private storage: Storage, private httpClient: HttpClient) {
    this.getUserName()
    this.setStatus()
    try {
      this.getOrders()
    } catch (error) {
      alert(error)
    }
  }

  async getProducts() {
    this.products = await this.storage.get('products')
  }

  setProducts() {
    return this.storage.set('products', this.products)
  }

  private getProductsFromApi() {
    let products: Array<Product> = []
    return new Promise<Array<Product>>((resolve, reject) => {
      this.httpClient.get(`${this.endpoint}vegetables`)
      .subscribe(data => {
        Object.keys(data).forEach(key => {
          let suppliers: Array<Supplier> = []
          data[key].suppliers.forEach(supplier => {
            suppliers.push(new Supplier(supplier.id, supplier.firstName, supplier.lastName, '', '', supplier.companyName))
          })
          products.push(new Product(data[key].id, data[key].productName, data[key].price, data[key].unit, data[key].stock,data[key].image64, suppliers, data[key].low_stock_threshold))
        })
        resolve(products)
      },
      error => {
        reject(error)
      })
    })
  }

  private getLastUpdateFromApi() {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(`${this.endpoint}lastupdate`)
      .subscribe(data => {
        resolve(data)
      },
      error => {
        reject(error)
      })
    })
  }

  // On prod must be private
  setLastUpdate(date: Date = new Date()) {
    return this.storage.set('lastUpdate', date)
  }
  
  getLastUpdate() {
    return this.storage.get('lastUpdate')
  }

  private clear() {
    return this.storage.clear()
  }

  async updateLocal() {
      await this.clear()
      await this.setUserName()
      this.products = await this.getProductsFromApi()
      await this.setProducts()
      
      let lastUpdateApi = await this.getLastUpdateFromApi()
      await this.setLastUpdate(new Date(lastUpdateApi.updated_at))
      await this.setEditInProgress(false)
      return true
  }

  async isUpToDate() {
    if (await this.getEditInProgress()) {
      return false
    }
    let lastUpdateApi = await this.getLastUpdateFromApi()
    lastUpdateApi = new Date(lastUpdateApi.updated_at)

    let lastUpdateLocal = await this.getLastUpdate()
    lastUpdateLocal = new Date(lastUpdateLocal)
    
    return (lastUpdateApi.getTime() > lastUpdateLocal.getTime())
  }

  updateProducts(changes) {
    return this.httpClient.patch(`${this.endpoint}newstock`, {changes: changes}).toPromise()
  }

  getEditInProgress() {
    return this.storage.get('editInProgress')
  }

 setEditInProgress(state: boolean) {
    return this.storage.set('editInProgress', state)
  }

  // Get info from status user in the storage
  private async getAdmin() {
    return this.storage.get('adminUser')
  }

  // Set the user status
  async setAdmin(userStatus: boolean = false) {
    await this.storage.set('adminUser', userStatus)
    this.setStatus()
  }

  // Set status string
  private async setStatus() {
    if (await this.getAdmin()) {
      this.status = 'Admin'
      this.isAdmin = true
    } else {
      this.status = 'Standard'
      this.isAdmin = false
    }
  }

  // Set the name in the storage
  setUserName(userName: string = this.userName) {
    return this.storage.set("user_name", userName)
  }

  // Get the name from the storage
  private async getUserName() {
    this.userName = await this.storage.get("user_name")
  }

  // Set order 
  setOrder(order) {
    return this.httpClient.post(`${this.endpoint}order`, {'productid': order.product_id, 'providerid': order.supplier_id, 'placedby': order.placed_by, 'quantity': order.quantity}).toPromise()
  }

  // Get orders
  async getOrders() {
    let orders: Array<Order> = []
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.endpoint}orders`)
      .subscribe(data => {
        Object.keys(data).forEach(key => {
          orders.push(new Order(data[key].id, data[key].productName, data[key].quantity, data[key].companyName, data[key].placed_by))
        })
        this.orders = orders
        resolve(true)
      },
      error => {
        reject(error)
      })
    })
  }

  // Delete an order
  deleteOrder(order) {
    return this.httpClient.post(`${this.endpoint}withdraw`, {'orderid': order.id}).toPromise()
  }

}
