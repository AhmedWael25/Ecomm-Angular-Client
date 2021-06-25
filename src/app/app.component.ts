import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './loader/loadingService/loading.service';
import { URLS } from './url.constants';
import { StyleCompiler } from '@angular/compiler';

declare var Stomp;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoading = this._loader.loading$;
  constructor(private _authService:AuthService,
    public _loader: LoadingService){}


  ngOnInit(): void {
    this._authService.autoLogin();


  
  }
  

}
