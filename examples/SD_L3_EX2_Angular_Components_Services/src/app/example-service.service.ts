import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './customer';
import { Customers } from './customers';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  accounts: Customers;

  constructor() { 
    this.accounts = new Customers();
  }

  getCustomers(): Observable<Customer[]> {
    const c1: Customer = new Customer(4711, "Alice");
    const c2: Customer = new Customer(4712, "Bob");
    this.accounts.addCustomer(c1);
    this.accounts.addCustomer(c2);
    const customerList = this.accounts?.getCustomerList();
    const customerListObservable = of(customerList);
    return customerListObservable;
  }
}
