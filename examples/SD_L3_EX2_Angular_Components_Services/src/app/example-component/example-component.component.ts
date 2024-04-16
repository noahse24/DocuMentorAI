import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer'

import { ExampleService } from '../example-service.service';

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.css']
})
export class ExampleComponentComponent implements OnInit {

  selectedCustomer?: Customer;
  customers: Customer[];

  constructor(private service: ExampleService) { 
    this.customers = [];
    this.getCustomers();
  }

  ngOnInit(): void {
  }

  getCustomers(): void {
    this.service.getCustomers()
        .subscribe(customers => this.customers = customers);
  }

}
