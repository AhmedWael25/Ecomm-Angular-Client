import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  logged=false;
  constructor() { }

  ngOnInit(): void {
    //this.logged=this._userService.isLogged();

  }

}
