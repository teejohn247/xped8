import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-notes-info',
  templateUrl: './notes-info.component.html',
  styleUrls: ['./notes-info.component.scss']
})
export class NotesInfoComponent implements OnInit {

  notesFieldData: any[];
  notesForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotesInfoComponent>,
    private fb: FormBuilder,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.notesFieldData = [
      {
        controlName: 'agentName',
        controlType: 'select',
        controlLabel: 'Agent Name',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Mark: 'Mark Thierry',
          Rita: 'Rita Crosby'
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
        controlName: 'noteDetails',
        controlType: 'text',
        controlLabel: 'Note Details',
        controlWidth: '100%',
        readonly: true,
        validators: [Validators.required],
        order: 3
      },
      // {
      //   controlName: 'dateCreated',
      //   controlType: 'date',
      //   controlLabel: 'Date Created',
      //   controlWidth: '48%',
      //   initialValue: '',
      //   validators: [Validators.required],
      //   order: 2
      // },
    ]

    this.notesFieldData.sort((a,b) => (a.order - b.order));
    this.notesForm = this.fb.group({});
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
