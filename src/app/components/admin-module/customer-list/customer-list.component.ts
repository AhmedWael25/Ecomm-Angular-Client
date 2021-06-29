import { CustomerData } from './../../../models/customer/CustomerData';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers : CustomerData[];
  searchName:string = "";

  constructor(private _adminService:AdminService) { }

  ngOnInit(): void {

    this._adminService.getAllCustomers().subscribe(response => {
      console.log(response);
      this.customers = response.data;
      console.log("customers :" + JSON.stringify(this.customers));

    });

  }

}
