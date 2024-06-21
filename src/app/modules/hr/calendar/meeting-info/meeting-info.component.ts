import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-meeting-info',
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.scss']
})
export class MeetingInfoComponent implements OnInit {

  meetingFieldData: any[];
  employees: any[] = [];
  meetingForm!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MeetingInfoComponent>,
    private fb: FormBuilder,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.employees = this.data.employeeList;

    this.meetingFieldData = [
      {
        controlName: 'meetingTitle',
        controlType: 'text',
        controlLabel: 'Meeting Title',
        controlWidth: '100%',
        initialValue: null,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'invitedGuests',
        controlType: 'mutipleSelect',
        controlLabel: 'Invited Guests',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.employees, 'email'),
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'location',
        controlType: 'select',
        controlLabel: 'Meeting Location',
        controlWidth: '48%',
        initialValue: 'Online',
        selectOptions: {
          Online: 'Online',
          Business: 'Business Lounge',
          Hallway: 'Hallway',
        },
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'meetingDate',
        controlType: 'date',
        controlLabel: 'Meeting Date',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'startTime',
        controlType: 'time',
        controlLabel: 'Start Time',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'endTime',
        controlType: 'time',
        controlLabel: 'End Time',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'meetingDescription',
        controlType: 'text',
        controlLabel: 'Meeting Description',
        controlWidth: '100%',
        initialValue: null,
        validators: [],
        order: 7
      },
    ]

    this.meetingFieldData.sort((a,b) => (a.order - b.order));
    this.meetingForm = this.fb.group({})

    this.meetingFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.meetingForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
    console.log(this.employees);
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
    if(this.meetingForm.valid) {
      let data = {
        meetingTitle: this.meetingForm.value.meetingTitle,
        invitedGuests: this.meetingForm.value.invitedGuests,
        location: this.meetingForm.value.location,
        meetingDescription: this.meetingForm.value.meetingDescription,
        meetingStartTime: this.combineDateTime(this.meetingForm.value.meetingDate,this.meetingForm.value.startTime),
        meetingEndTime: this.combineDateTime(this.meetingForm.value.meetingDate,this.meetingForm.value.endTime)
      }
      console.log(data);
      this.hrService.bookMeeting(data).subscribe({
        next: res => {
          // console.log(res);
          if(res.status == 200) {
            this.notifyService.showSuccess('This meeting has been booked successfully');
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

  removeGuest(guestEmail: string) {
    const selectedGuests = this.meetingForm.value['invitedGuests'] as string[];
    this.removeFirst(selectedGuests, guestEmail);
    this.meetingForm.get['invitedGuests'].setValue(selectedGuests); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  combineDateTime(dateVal: Date, timeVal: String) {
    const date = String(dateVal);
    const time = timeVal;
    const t1: any = time.split(' ');
    const t2: any = t1[0].split(':');
    t2[0] = (t1[1] === 'PM' ? (1*t2[0] + 12) : t2[0]);
    const time24 = (t2[0] < 10 ? '0' + t2[0] : t2[0]) + ':' + t2[1];
    const completeDate = date.replace("00:00", time24.toString());
    return completeDate;
  }
}
