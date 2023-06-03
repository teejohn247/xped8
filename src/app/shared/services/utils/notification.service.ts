import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastr: ToastrService) { }

  showSuccess(message: string = "Successful") {
    this._toastr.success(message, "Success")
  }

  showError(message:string = "") {
    var errorMessage = message? message : "Dear user, we tried processing your request. However, there seems to be a connectivity issue. We advise you try again shortly.";
    this._toastr.error(errorMessage, "Error")
  }

  showInfo(message: string) {
    this._toastr.info(message, "Info")
  }

  showWarning(message: string) {
    this._toastr.warning(message, "Error");
  }

  networkError() {
    this.showWarning("Network Error");
  }
  
  sessionError() {
    this.showError("Your session has expired. please login again to proceed");
  }

  forbiddenError() {
    this.showError("Sorry you are not permitted to perfom this action");
  }

  showMessage(issuccessful: boolean = true, message: string = "Successful") {
    if (issuccessful) {
      this._toastr.success(message, "Success")
    } else {
      this.showWarning(message);
    }

  }
}
