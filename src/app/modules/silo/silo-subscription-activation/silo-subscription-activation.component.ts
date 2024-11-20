import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-silo-subscription-activation',
  templateUrl: './silo-subscription-activation.component.html',
  styleUrls: ['./silo-subscription-activation.component.scss']
})
export class SiloSubscriptionActivationComponent implements OnInit {

  subscriptionInfoFields: FormFields[];
  subscriptionInfoGroupForm!: FormGroup;
  moduleList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SiloSubscriptionActivationComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.moduleList = this.data.moduleList;
    console.log(this.moduleList);
    this.subscriptionInfoGroupForm = this.fb.group({})

    this.subscriptionInfoFields = [
      {
        controlName: 'subscriptionPlan',
        controlType: 'select',
        controlLabel: 'Subscription Plan',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {
          Free: 'Free Trial',
          Paid: 'Paid',
        },
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'subscriptionCycle',
        controlType: 'select',
        controlLabel: 'Subscription Cycle',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {
          BiWeekly: 'BiWeekly',
          Monthly: 'Monthly',
          Annualy: 'Annualy'
        },
        validators: [Validators.required],
        order: 2
      },      
      {
        controlName: 'startDate',
        controlType: 'date',
        controlLabel: 'Start Date',
        controlWidth: '48%',
        initialValue: this.data.isExisting ? this.data.modalInfo.startDate : null,
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'endDate',
        controlType: 'date',
        controlLabel: 'End Date',
        controlWidth: '48%',
        initialValue: this.data.isExisting ? this.data.modalInfo.endDate : null,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'moduleIds',
        controlType: 'mutipleSelect',
        controlLabel: 'Modules',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.moduleList, 'value'),
        validators: [Validators.required],
        order: 5
      },
    ]

    this.subscriptionInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.subscriptionInfoGroupForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
  }

  removeModule(name: string) {
    const selectedModules = this.subscriptionInfoGroupForm.value['moduleIds'] as string[];
    this.removeFirst(selectedModules, name);
    this.subscriptionInfoGroupForm.get['moduleIds'].setValue(selectedModules); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  //Converts an array to an Object of key value pairs
  arrayToObject(arrayVar, key:string) {
    let reqObj = {}
    reqObj = arrayVar.reduce((agg, item, index) => {
      agg[item['value']] = item[key];
      return agg;
    }, {})
    console.log(reqObj);
    return reqObj;
  }

}
