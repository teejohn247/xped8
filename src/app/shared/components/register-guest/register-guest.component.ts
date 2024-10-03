import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-register-guest',
  templateUrl: './register-guest.component.html',
  styleUrls: ['./register-guest.component.scss']
})
export class RegisterGuestComponent implements OnInit {

  visitorFieldData: any[];
  employees: any[] = [];
  visitorForm!: FormGroup
  type: 'text' | 'select';
  @Input() control:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterGuestComponent>,
    private fb: FormBuilder,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.employees = this.data.employeeList;

    this.visitorFieldData = [
      {
        controlName: 'name',
        controlType: 'text',
        controlLabel: 'Name',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'email',
        controlType: 'text',
        controlLabel: 'Email Address',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required, Validators.email],
        order: 3
      },
      {
        controlName: 'phoneNo',
        controlType: 'text',
        controlLabel: 'Phone Number',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'purpose',
        controlType: 'select',
        controlLabel: 'Purpose of visit',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {
          Business: 'Business',
          Personal: 'Personal',
        },
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'visitDate',
        controlType: 'date',
        controlLabel: 'Visit Date',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'startTime',
        controlType: 'time',
        controlLabel: 'Start Time',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 7
      },
      {
        controlName: 'endTime',
        controlType: 'time',
        controlLabel: 'End Time',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 8
      },
      {
        controlName: 'host',
        controlType: 'select',
        controlLabel: 'Employee',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.employees, 'fullName'),
        validators: [Validators.required],
        order: 4
      },
    ]

    this.visitorFieldData.sort((a,b) => (a.order - b.order));
    this.visitorForm = this.fb.group({})

    this.visitorFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.visitorForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
    
    
  }

  //Converts an array to an Object of key value pairs
  arrayToObject(arrayVar, key:string) {
    let reqObj = {}
    reqObj = arrayVar.reduce((agg, item, index) => {
      agg[item['_id']] = item[key];
      return agg;
    }, {})
    console.log(reqObj);
    return reqObj;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.visitorForm.valid) {
      let data = {
        employeeId: this.visitorForm.value.host,
        guestName: this.visitorForm.value.name,
        purpose: this.visitorForm.value.purpose,
        email: this.visitorForm.value.email,
        phoneNumber: this.visitorForm.value.phoneNo,
        visitDate: this.visitorForm.value.visitDate,
      }
      console.log(data);
      this.hrService.bookVisitor(data).subscribe({
        next: res => {
          // console.log(res);
          if(res.status == 200) {
            this.notifyService.showSuccess('This visitor has been booked successfully');
            this.dialogRef.close();
          }
        },
        error: err => {
          console.log(err)
          this.notifyService.showError(err.error.error);
        } 
      })
    }
  }

}
