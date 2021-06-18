import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-controller',
  templateUrl: './page-controller.component.html',
  styleUrls: ['./page-controller.component.css']
})
export class PageControllerComponent implements OnInit {

  @Input("page") page:number;
  @Input("size") size:number;


  constructor() { }

  ngOnInit(): void {
  }

  increasePage():void{

    ++this.page;

  }

  decreasePage():void{

    if(this.page > 0){
      --this.page;
    }else{

    }


  }

  increaseSize():void{
    ++this.size;
  }

  decreaseSize():void{

    if(this.size > 1){
      --this.size;
    }else{

    }
  }

}
