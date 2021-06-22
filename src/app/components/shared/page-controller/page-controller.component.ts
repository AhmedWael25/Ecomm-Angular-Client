import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';



export interface PageControllerChangeArgs{

  page : number ;
  size : number ;

}

@Component({
  selector: 'page-controller',
  templateUrl: './page-controller.component.html',
  styleUrls: ['./page-controller.component.css']
})
export class PageControllerComponent implements OnInit {

  @Input("page") page:number;
  @Input("size") size:number;
  @Output("change")  change = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  increasePage():void{

    ++this.page;
    this.change.emit(
      {
        page : this.page ,
        size : this.size
      }
    );

  }

  decreasePage():void{

    if(this.page > 0){
      --this.page;
    }else{

    }
    this.change.emit(
      {
        page : this.page ,
        size : this.size
      }
    );

  }

  increaseSize():void{
    ++this.size;
    this.change.emit(
      {
        page : this.page ,
        size : this.size
      }
    );
  }

  decreaseSize():void{

    if(this.size > 1){
      --this.size;
    }else{

    }
    this.change.emit(
      {
        page : this.page ,
        size : this.size
      }
    );
  }

}
