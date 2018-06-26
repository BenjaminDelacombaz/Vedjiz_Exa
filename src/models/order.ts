import { Product } from "./product";
import { Supplier } from "./supplier";

export class Order {
  id: number
  product_id: number
  product_name: string
  quantity: number
  supplier_id: number
  supplier_company: string
  placed_by: string

  constructor(id: number, product_name: string, quantity: number, supplier_company: string, placed_by: string, product_id: number = 0, supplier_id: number = 0) {
    this.id = id
    this.product_id = product_id
    this.product_name = product_name
    this.quantity = quantity
    this.supplier_company = supplier_company
    this.supplier_id = supplier_id
    this.placed_by = placed_by
  }
}
