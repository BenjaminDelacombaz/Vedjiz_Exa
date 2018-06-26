import { Product } from "./product";
import { Supplier } from "./supplier";

export class Order {
  id: number
  product: Product
  quantity: number
  supplier: Supplier
  placed_by: string

  constructor(id: number, product: Product, quantity: number, supplier: Supplier, placed_by: string) {
    this.id = id
    this.product = product
    this.quantity = quantity
    this.supplier = supplier
    this.placed_by = placed_by
  }
}
