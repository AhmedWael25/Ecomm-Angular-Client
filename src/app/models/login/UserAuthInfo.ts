export class UserAuthInfo{

    public id:number;
    private email:string;
    private role:string;
    private _jwt:string;
    private _jwtExpireDate:Date;

    constructor(
         id:number,
         email:string,
         role:string,
         _jwt:string,
         _jwtExpireDate:Date
    ){}

    get token(){
        if( !this._jwtExpireDate || new Date() > this._jwtExpireDate ){
            return null;
        }
        return this._jwt;
    }
}