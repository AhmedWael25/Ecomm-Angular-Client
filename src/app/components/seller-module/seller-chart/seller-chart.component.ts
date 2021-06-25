import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SellerOrder } from 'src/app/models/seller/SellerOrder';
import { SellerOrderItem } from 'src/app/models/seller/SellerOrderItem';
import { SoldItems } from 'src/app/models/seller/SoldItems';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-chart',
  templateUrl: './seller-chart.component.html',
  styleUrls: ['./seller-chart.component.css']
})
export class SellerChartComponent implements OnInit {

  isLoading: boolean = false;
  isError: boolean = false;
  pieChartData: Map<string, number> = new Map();
  lineChartData: Map<string, number> = new Map();

  soldItems: SoldItems[] = [];

  orderlist:SellerOrder[] = [];

  constructor(private _authService: AuthService,
    private _sellerService: SellerService,
    private _datePipe: DatePipe) { }



  ngOnInit(): void {
    this.isLoading = true;
    this._sellerService.getSoldItems().subscribe(
      resp => {
        this.soldItems = resp.data.map(el => {
          let item: SoldItems = new SoldItems();
          item.name = el.name;
          item.orderId = el.orderId;
          item.price = el.price;
          item.productId = el.productId;
          item.soldDate = new Date(el.soldDate);
          item.soldQuantity = el.soldQuantity;
          return item;
        });
        console.log(this.soldItems);

        this.preparePieChartData(this.soldItems);
        this.prepareLineChartData(this.soldItems);
        this.prepareOrderList(this.soldItems);
        // this.pieChartData.forEach((value: number, key:string) => {
        //   console.log(key, value);
        // });
        // this.lineChartData.forEach((value: number, key: string) => {
        //   console.log(key, value);
        // });
      },
      err => {
        console.log(err);
      },
      () => {
        this.isLoading = false;
      },
    );

  }

  preparePieChartData(data: SoldItems[]) {
    data.forEach(e => {

      const key = e.productId+"-"+e.name;

      if (this.pieChartData.has(key)) {

        let temp = this.pieChartData.get(key);
        this.pieChartData.set(key, temp + e.soldQuantity);
      } else {
        this.pieChartData.set(key, e.soldQuantity)
      }
    });
  }

  prepareLineChartData(data: SoldItems[]) {
    data.forEach(e => {

      let date = e.soldDate;
      let newDate = this._datePipe.transform(new Date(date), "dd-MM-yyyy");

      if (this.lineChartData.has(newDate)) {

        let temp = this.lineChartData.get(newDate);
        let total = e.soldQuantity * e.price;
        this.lineChartData.set(newDate, temp + total);
      } else {
        let total = e.soldQuantity * e.price;
        this.lineChartData.set(newDate, total);
      }
    });
  }


  prepareOrderList(data: SoldItems[]){
    data.forEach( e => {

      let orderId:number = e.orderId;
      let order:SellerOrder = this._retrieveOrder(orderId);
      //if order is null it wasnot put before
      //if no it was, insert sold item into order item array
      console.log(order);
      if(order){
        let item:SellerOrderItem = new SellerOrderItem();
        item.id = e.productId;
        item.name = e.name;
        item.quantity = e.soldQuantity;
        item.price = e.price;

        order.items.push(item);
      }else{
        let order:SellerOrder = new SellerOrder();
        let item:SellerOrderItem = new SellerOrderItem();
        item.id = e.productId;
        item.name = e.name;
        item.quantity = e.soldQuantity;
        item.price = e.price;
        
        let date = e.soldDate;
        let newDate = this._datePipe.transform(new Date(date), "dd-MM-yyyy");
        
        order.date = newDate;
        order.id = e.orderId;
        order.items = [];
        order.items.push(item);

        this.orderlist.push( order );
        console.log("List Now =>>");
      }
    });
    console.log(this.orderlist);
  }

  private  _retrieveOrder(id:number){

    let i:number = 0;
    for(i = 0 ; i < this.orderlist.length ; i ++){
      
      if( this.orderlist[i].id === id ){
        return this.orderlist[i];
      }
    }
    return null;
  }

  orderTotal(order:SellerOrder){
    
    let sum:number = 0;
    order.items.forEach(e => {
      sum += e.price * e.quantity;
    })
    return sum;
  }


  totalProfit(orders:SellerOrder[]){
    let sum:number = 0;
    orders.forEach(order => {
      sum +=  this.orderTotal(order);
    });
    return sum;
  }

  totalProductsBought(orders:SellerOrder[]){
    
    let total:number = 0;
    orders.forEach(order =>{
      order.items.forEach( item => {
        total += item.quantity;
      })
    });
    return total;
  }


}
