import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { CrmService } from 'src/app/shared/services/crm/crm.service';

@Component({
  selector: 'app-socials-info',
  templateUrl: './socials-info.component.html',
  styleUrls: ['./socials-info.component.scss']
})
export class SocialsInfoComponent implements OnInit {

  postFieldData: any[];
  postForm!: FormGroup;

  fileName: string;
  imgFile: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<SocialsInfoComponent>,
    private fb: FormBuilder,
    private crmService: CrmService,     
    private notifyService: NotificationService,
  ) {
    this.setUpForm(); 
  }

  ngOnInit(): void {
    this.postForm.valueChanges.subscribe(val => {
      console.log(val)
    })
  }

  setUpForm() {

    this.postFieldData = [
      {
        controlName: 'mediaAccounts',
        controlType: 'mutipleSelect',
        controlLabel: 'Media Accounts',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: {
          Facebook: 'Facebook',
          Instagram: 'Instagram',
          Linkedin: 'Linkedin'
        },
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'scheduleDate',
        controlType: 'date',
        controlLabel: 'Scheduled Date',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'scheduleTime',
        controlType: 'time',
        controlLabel: 'Scheduled Time',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 3
      },      
      {
        controlName: 'fileUpload',
        controlType: 'file',
        controlLabel: '',
        controlWidth: '100%',
        initialValue: null,
        validators: [],
        order: 4
      },
      {
        controlName: 'caption',
        controlType: 'editor',
        controlLabel: 'Caption',
        controlWidth: '100%',
        initialValue: '',
        validators: [],
        order: 5
      },
    ]

    this.postFieldData.sort((a,b) => (a.order - b.order));
    this.postForm = this.fb.group({})

    this.postFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.postForm.addControl(field.controlName, formControl)
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  removeAccount(ticket: any) {
    const selectedAccounts = this.postForm.value['mediaAccounts'] as string[];
    this.removeFirst(selectedAccounts, ticket);
    this.postForm.get['mediaAccounts'].setValue(selectedAccounts); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  imgFileUpload(event) {
    this.imgFile = event.target.files[0];
    this.fileName = this.imgFile.name;
  }

  onSubmit() {

  }

}
