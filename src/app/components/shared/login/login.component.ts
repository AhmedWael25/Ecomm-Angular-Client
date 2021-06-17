import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login/loginRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loginData:LoginRequest = new LoginRequest();
  isLoading:boolean = false;
  isError:boolean = false;
  errMessage:string = null;

  constructor(private _authService:AuthService) { 

  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      "email":new FormControl(null,[Validators.required]),

      "password":new FormControl(null, [Validators.required]),
    });

  }


  onSubmit(){
  
    if( !this.loginForm.valid ){
      return;
    }
    
    //Call AUth API HERE==========
    this.isLoading = true;
    this.loginData.username = this.loginForm.value.email;
    this.loginData.password = this.loginForm.value.password;
    console.log( this.loginForm.value );
    this._authService.attemptLogin(this.loginData);


    //===========================

    this.loginForm.reset();
    this.isLoading = false;
  }


  getEmail(){
    return this.loginForm.get("email");
  }
  getPassword(){
    return this.loginForm.get("email");
  }

}
