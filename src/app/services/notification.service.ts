import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastService: ToastrService) { }

  setPosition(position: string){
    switch(position){
      case "topRight": {
        return "toast-top-right";
      }
      case "bottomRight": {
        return "toast-bottom-right";
      }
      case "topLeft": {
        return "toast-top-left";
      }
      case "bottomLeft": {
        return "toast-bottom-left";
      }
    }
  }

  onSuccess(message: string, timeOut: number, position: string){
    return this._toastService.success(message, "Successfully", {
      timeOut: timeOut,
      positionClass: this.setPosition(position),
    });
  }

  onError(message: string, timeOut: number, position: string){
    return this._toastService.error(message, "Error", {
      timeOut: timeOut,
      positionClass: this.setPosition(position),
    });
  }

  onWarning(message: string, timeOut: number, position: string){
    return this._toastService.warning(message, "Warning", {
      timeOut: timeOut,
      positionClass: this.setPosition(position),
    });
  }

  onInfo(message: string, timeOut: number, position: string){
    return this._toastService.info(message, "Information", {
      timeOut: timeOut,
      positionClass: this.setPosition(position),
    });
  }

  onShow(message: string, timeOut: number, position: string){
    return this._toastService.show(message, "Show", {
      timeOut: timeOut,
      positionClass: this.setPosition(position),
    });
  }

}
