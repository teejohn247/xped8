import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss']
})
export class ActivityInfoComponent implements OnInit {

  activityFieldData: any[];
  activitiesForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActivityInfoComponent>,
    private fb: FormBuilder,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,

  ) {
    this.activityFieldData = [
      {
        controlName: 'activityType',
        controlType: 'select',
        controlLabel: 'Activity Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Call: 'Call',
          Meeting: 'Meeting',
          Email: 'Email'
        },
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'priority',
        controlType: 'select',
        controlLabel: 'Priority',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Important: 'Important',
          Necessary: 'Necessary',
          Regular: 'Regular'
        },
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'activityNotes',
        controlType: 'text',
        controlLabel: 'Activity Notes',
        controlWidth: '100%',
        readonly: true,
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'activityDate',
        controlType: 'date',
        controlLabel: 'Activity Date',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'activityTime',
        controlType: 'time',
        controlLabel: 'Activity Time',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 4
      },
    ]

    this.activityFieldData.sort((a,b) => (a.order - b.order));
    this.activitiesForm = this.fb.group({});
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

}
