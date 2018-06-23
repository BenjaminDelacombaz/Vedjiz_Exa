import { User } from './user';

export class Supplier extends User {
  companyName: string

  constructor(id: number, firstName: string, lastName: string, phone: string, address: string, companyName: string) {
    super(id, firstName, lastName, phone, address)
    this.companyName = companyName
  }
}
