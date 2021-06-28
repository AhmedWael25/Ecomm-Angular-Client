import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';




export interface PageControllerChangeArgs{

  page : number ;
  size : number ;
  totalPages : number ;

}


@Component({
  selector: 'page-controller',
  templateUrl: './page-controller.component.html',
  styleUrls: ['./page-controller.component.css']
})
export class PageControllerComponent implements OnInit {

  // items: number[];

  @Input("page") page:number;
  @Input("size") size:number;
  @Input("items") items:number[];
  @Input("totalPages")  totalPages: number;
  @Output("change")  change = new EventEmitter();



  constructor() { }

  ngOnInit(): void {


}

  /* increasePage():void{

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

  } */



  updateSize(value: string) {
      let val = +value;
      this.size = val ;
      console.log(val);

      this.change.emit({
        page : 0 ,
        size : this.size,
        totalPages : this.totalPages
      });

  }

  setPage(page:number) : void {

    this.page = page;


    this.change.emit( {
        page : this.page ,
        size : this.size ,
        totalPages : this.totalPages
      } );
  }

}
