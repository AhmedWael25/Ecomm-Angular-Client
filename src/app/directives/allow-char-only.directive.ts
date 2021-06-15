import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowCharOnly]'
})
export class AllowCharOnlyDirective {

  constructor(private el:ElementRef) { }

  @HostListener('keyup') onKeyUp(){
   
    let text=this.el.nativeElement.value;
    this.el.nativeElement.value="Mohamed";
    alert(text) ;
  }

}
