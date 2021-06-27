import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  errMessage:string = "";

  constructor(private _authService:AuthService,
              private _router:Router) { 

  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email:new FormControl(null,[Validators.required]),
      password:new FormControl(null, [Validators.required]),
    });

  }


  async onSubmit(){
    this.isError = false;
  
    if( !this.loginForm.valid ){
      return;
    }
    
    //Call AUth API HERE==========
    this.isLoading = true;
    this.loginData.email = this.loginForm.value.email;
    this.loginData.password = this.loginForm.value.password;

    let LoggedIn:boolean = false;
    await this._authService.attemptLogin(this.loginData)
   .then((resp) =>{
     LoggedIn = resp;
   });

   await new Promise(f => setTimeout(f, 200));

    // console.log("in Auth"+ isAuth);
    if(LoggedIn){
      
      if(this._authService.isCustomer()){
        this._router.navigateByUrl("/");
      }
      if(this._authService.isAdmin()){
        this._router.navigateByUrl("/admin");
      }
      if(this._authService.isSeller()){
        this._router.navigateByUrl("/seller");
      }
    }else{
      console.log("sdsd");
      this.errMessage = "Invalid Login Credentials";
      this.isError = true;
    }

   

    
    //===========================

    this.loginForm.reset();
    this.isLoading = false;
  }


  getEmail(){
    return this.loginForm.get("email");
  }
  getPassword(){
    return this.loginForm.get("password");
  }

}
