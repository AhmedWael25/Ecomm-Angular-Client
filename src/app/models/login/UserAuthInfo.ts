import { ThisReceiver } from "@angular/compiler";

export class UserAuthInfo{

    // public id:number;
    // public email:string;
    // public role:string;
    // private _jwt:string;
    // private _jwtExpireDate:Date;

    constructor(
         public id:number,
        public email:string,
        public role:string,
       private _jwt:string,
       private _jwtExpireDate:Date
    ){

    }

    // constructor(
    //      id:number,
    //      email:string,
    //      role:string,
    //      _jwt:string,
    //      _jwtExpireDate:Date
    // ){
    //     this.id = id;
    //     this.email = email;
    //     this.role = role;
    //     this._jwt = thi
    // }

    get token(){
        if( !this._jwtExpireDate || new Date() > this._jwtExpireDate ){
            return null;
        }
        return this._jwt;
    }
}