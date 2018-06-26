import { Supplier } from './supplier';

export class Product {
  id: number
  name: string
  unit: string
  price: number
  stock: number
  picture: string
  suppliers: Array<Supplier>
  edited: boolean
  lowStockThreshold: number

  constructor(id: number, name: string, price: number, unit: string, stock: number, picture: string, suppliers: Array<Supplier> = [], lowStockThreshold: number) {
    this.id = id
    this.name = name
    this.price = price
    this.unit = unit
    this.stock = stock
    this.picture = picture
    this.suppliers = suppliers
    this.edited = false
    this.lowStockThreshold = lowStockThreshold
  }

}