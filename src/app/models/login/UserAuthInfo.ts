export class UserAuthInfo{

    constructor(
        public id:number,
        private _jwt:string,
        private _jwtExpireDate:Date
    ){}

    get token(){
        if( !this._jwtExpireDate || new Date() > this._jwtExpireDate ){
            return null;
        }
        return this._jwt;
    }
}