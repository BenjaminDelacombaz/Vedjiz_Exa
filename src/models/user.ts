export class User {
  id: number
  firstName: string
  lastName: string
  phone: string
  address: string

  constructor(id: number, firstName: string, lastName: string, phone: string, address: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.address = address
  }
}
