import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-silo-permission-info',
  templateUrl: './silo-permission-info.component.html',
  styleUrls: ['./silo-permission-info.component.scss']
})
export class SiloPermissionInfoComponent implements OnInit {

  permissionInfoFields: FormFields[];
  permissionInfoGroupForm!: FormGroup;
  moduleList: any[] = [];
  featuresList:any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SiloPermissionInfoComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.moduleList = this.data.moduleList;
    this.featuresList = this.data.featureList;
    console.log(this.moduleList);
    this.permissionInfoGroupForm = this.fb.group({})

    this.permissionInfoFields = [
      {
        controlName: 'permissionName',
        controlType: 'text',
        controlLabel: 'Permission Name',
        controlWidth: '48%',
        initialValue: this.data.isExisting ? this.data.modalInfo.permissionName : null,
        validators: null,
        order: 1
      },
      {
        controlName: 'permissionKey',
        controlType: 'text',
        controlLabel: 'Permission Key',
        controlWidth: '48%',
        initialValue: this.data.isExisting ? this.data.modalInfo.permissionKey : null,
        validators: null,
        order: 2
      },      
      {
        controlName: 'moduleId',
        controlType: 'select',
        controlLabel: 'Module',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.moduleList, 'moduleName'),
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'featureId',
        controlType: 'select',
        controlLabel: 'Feature',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.featuresList, 'featureName'),
        validators: [Validators.required],
        order: 4
      },
    ]
  }

  ngOnInit(): void {
  }


  //Converts an array to an Object of key value pairs
  arrayToObject(arrayVar, key:string) {
    let reqObj = {}
    reqObj = arrayVar.reduce((agg, item, index) => {
      agg[item['key']] = item[key];
      return agg;
    }, {})
    console.log(reqObj);
    return reqObj;
  }

}
