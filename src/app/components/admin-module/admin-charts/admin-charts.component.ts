import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SoldItems } from 'src/app/models/seller/SoldItems';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {

  soldItems:SoldItems[] = [];
  isLoading:boolean = false;

  isError: boolean = false;
  dailyProfitBarChartData: Map<string, number> = new Map();
  quantityPerItemPieChartData: Map<string, number> = new Map();
  soldPerSellerPieChartData:Map<string, number> = new Map();
  profitPerSellerPieChartData:Map<string, number> = new Map();

  constructor(private _authService: AuthService,
    private _adminService:AdminService,
    private _datePipe:DatePipe) { }
  ngOnInit(): void {

    
    this.isLoading  = true;
    this._adminService.getAllSoldItems().subscribe(
      resp => {
        this.soldItems = resp.data;
        console.log(this.soldItems);
        this.prepareQuantityPerItemChart(this.soldItems);
        this.prepareDailyProfitData(this.soldItems);
        this.prepareSoldQuantityPerSeller(this.soldItems);
        this.prepareProfitPerSellerPieChartDate(this.soldItems);
        this.isLoading = false
      },
      err => {
        console.log("Err");
        this.isLoading = false
      },
      () => {},
    )
  }

  //Quantity Sold Of Each Product
  prepareQuantityPerItemChart(data: SoldItems[]) {
    data.forEach(e => {

      const key = e.productId+"-"+e.name;

      if (this.quantityPerItemPieChartData.has(key)) {

        let temp = this.quantityPerItemPieChartData.get(key);
        this.quantityPerItemPieChartData.set(key, temp + e.soldQuantity);
      } else {
        this.quantityPerItemPieChartData.set(key, e.soldQuantity)
      }
    });
  }
  //Daily Profit Over All Sold
  prepareDailyProfitData(data: SoldItems[]) {
    data.forEach(e => {

      let date = e.soldDate;
      let newDate = this._datePipe.transform(new Date(date), "dd-MM-yyyy");

      if (this.dailyProfitBarChartData.has(newDate)) {

        let temp = this.dailyProfitBarChartData.get(newDate);
        let total =+ e.soldQuantity * e.price;
        this.dailyProfitBarChartData.set(newDate, temp + total);
      } else {
        let total = e.soldQuantity * e.price;
        this.dailyProfitBarChartData.set(newDate, total);
      }
    });
  }

  prepareSoldQuantityPerSeller(data:SoldItems[]){

    data.forEach( e=> {
      
      const key = e.sellerId + "-" + e.sellerName;
      if(this.soldPerSellerPieChartData.has(key)){
        let temp = this.soldPerSellerPieChartData.get(key);
        let total = e.soldQuantity;
        this.soldPerSellerPieChartData.set(key, total+temp);
      }else{
        let total = e.soldQuantity;
        this.soldPerSellerPieChartData.set(key, total);
      }
    });
  }

  prepareProfitPerSellerPieChartDate(data:SoldItems[]){

    data.forEach( e=> {
      
      const key = e.sellerId + "-" + e.sellerName;
      if(this.profitPerSellerPieChartData.has(key)){
        let temp = this.profitPerSellerPieChartData.get(key);
        let total = e.soldQuantity * e.price;
        this.profitPerSellerPieChartData.set(key, total+temp);
      }else{
        let total = e.soldQuantity * e.price;
        this.profitPerSellerPieChartData.set(key, total);
      }
    });
  }



}
