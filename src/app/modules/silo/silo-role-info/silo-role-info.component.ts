import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-silo-role-info',
  templateUrl: './silo-role-info.component.html',
  styleUrls: ['./silo-role-info.component.scss']
})
export class SiloRoleInfoComponent implements OnInit {

  roleInfoFields: FormFields[];
  roleInfoGroupForm!: FormGroup;
  moduleList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SiloRoleInfoComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.moduleList = this.data.moduleList;
    console.log(this.moduleList);
    this.roleInfoGroupForm = this.fb.group({})

    this.roleInfoFields = [
      {
        controlName: 'roleName',
        controlType: 'text',
        controlLabel: 'Role Name',
        controlWidth: '100%',
        initialValue: this.data.isExisting ? this.data.modalInfo.roleName : null,
        validators: null,
        order: 1
      },     
      {
        controlName: 'description',
        controlType: 'textarea',
        controlLabel: 'Description',
        controlWidth: '100%',
        initialValue: this.data.isExisting ? this.data.modalInfo.description : null,
        validators: null,
        order: 3
      },
      {
        controlName: 'moduleIds',
        controlType: 'mutipleSelect',
        controlLabel: 'Modules',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.moduleList, 'value'),
        validators: [Validators.required],
        order: 2
      },
    ]

    this.roleInfoFields.sort((a,b) => (a.order - b.order));

    this.roleInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.roleInfoGroupForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
  }

  removeModule(name: string) {
    const selectedModules = this.roleInfoGroupForm.value['moduleIds'] as string[];
    this.removeFirst(selectedModules, name);
    this.roleInfoGroupForm.get['moduleIds'].setValue(selectedModules); // To trigger change detection
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
