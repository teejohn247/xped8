import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogData } from '../../models/confirmation-dialog-data';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { WorkLocationComponent } from 'src/app/modules/hr/attendance/work-location/work-location.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  isMobile:boolean = false;

  constructor(private _toastr: ToastrService, private dialog: MatDialog) {
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.isMobile = true;
    }
  }

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

  confirmAction(data: ConfirmationDialogData): Observable<boolean> {
    return this.dialog.open(
      ConfirmationDialogComponent, 
      {
        data,
        width: this.isMobile ? '95%' : '40%',
        height: 'auto',
        disableClose: true,
      }
    ).afterClosed();
  }

  confirmCheckIn(data: ConfirmationDialogData): Observable<boolean> {
    return this.dialog.open(
      WorkLocationComponent, 
      {
        data,
        width: '60%',
        height: 'auto',
        disableClose: true,
      }
    ).afterClosed();
  }
}
