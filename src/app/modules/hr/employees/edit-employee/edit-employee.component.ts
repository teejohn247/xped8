import { Component, Inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { EmployeeFormData } from 'src/app/shared/models/employee-data';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  officialTabActive: boolean = true;
  profileImgFile: File;
  profilePic: string | SafeUrl = 'https://onburdstorageaccount.blob.core.windows.net/onburd/public/onburd_fe/assets/onburd-corporate/images/user_profile_icon.svg';

  officialInfoFields: EmployeeFormData[];
  officialInfoForm!: FormGroup;
  personalInfoFields: any;
  personalInfoForm!: FormGroup;

  departmentList: any[] = [];
  designationList: any[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.officialInfoForm = this.fb.group({})
    this.personalInfoForm = this.fb.group({})
    this.setUpForm();
  }

  ngOnInit(): void {
  }

  profilePicUpload(event) {
    this.profileImgFile = event.target.files[0];
    this.profilePic = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(event.target.files[0])
    );
    // this.fileName = this.employeesFile.name;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setUpForm = async () => {
    this.departmentList = this.dialogData.departmentList;
    this.designationList = this.dialogData.designationList;

    this.officialInfoFields = [
      {
        controlName: 'firstName',
        controlType: 'text',
        controlLabel: 'First Name',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'lastName',
        controlType: 'text',
        controlLabel: 'Last Name',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'officialEmail',
        controlType: 'text',
        controlLabel: 'Company Email Address',
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
        order: 4
      },
      {
        controlName: 'dateOfBirth',
        controlType: 'date',
        controlLabel: 'Date of Birth',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'gender',
        controlType: 'select',
        controlLabel: 'Gender',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Male: 'Male',
          Female: 'Female'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'employmentStartDate',
        controlType: 'date',
        controlLabel: 'Employment Start Date',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'employmentType',
        controlType: 'select',
        controlLabel: 'Employment Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Contract: 'Contract',
          Permanent: 'Permanent'
        },
        validators: [Validators.required],
        order: 10
      },
      {
        controlName: 'designation',
        controlType: 'select',
        controlLabel: 'Designation',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.designationList, 'designationName'),
        validators: [Validators.required],
        order: 11
      },
      {
        controlName: 'department',
        controlType: 'select',
        controlLabel: 'Department',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.departmentList, 'departmentName'),
        validators: [Validators.required],
        order: 7
      },
      {
        controlName: 'role',
        controlType: 'text',
        controlLabel: 'Role',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 8
      },
    ]

    this.personalInfoFields = [
      {
        controlName: 'personalEmail',
        controlType: 'text',
        controlLabel: 'Personal Email Address',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.email],
        order: 1
      },
      {
        controlName: 'personalPhoneNo',
        controlType: 'text',
        controlLabel: 'Personal Phone Number',
        controlWidth: '48%',
        initialValue: null,
        validators: [],
        order: 2
      },
      {
        controlName: 'address',
        controlType: 'text',
        controlLabel: 'House Address',
        controlWidth: '100%',
        initialValue: null,
        validators: [],
        order: 3
      },
      {
        controlName: 'city',
        controlType: 'select',
        controlLabel: 'City',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {},
        validators: [],
        order: 4
      },
      {
        controlName: 'country',
        controlType: 'select',
        controlLabel: 'Country',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {},
        validators: [],
        order: 5
      },
      {
        controlName: 'maritalStatus',
        controlType: 'select',
        controlLabel: 'Marital Status',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {},
        validators: [],
        order: 6
      },
      {
        controlName: 'nationality',
        controlType: 'select',
        controlLabel: 'Nationality',
        controlWidth: '48%',
        initialValue: null,
        selectOptions: {},
        validators: [],
        order: 7
      },
      {
        controlName: 'nextOfKinName',
        controlType: 'text',
        controlLabel: 'Next of Kin Name',
        controlWidth: '48%',
        initialValue: null,
        validators: [],
        order: 8
      },
      {
        controlName: 'nextOfKinRelationship',
        controlType: 'text',
        controlLabel: 'Next of Kin Relationship',
        controlWidth: '48%',
        initialValue: null,
        validators: [],
        order: 9
      },
      {
        controlName: 'nextOfKinPhoneNo',
        controlType: 'text',
        controlLabel: 'Next of Kin Phone No',
        controlWidth: '48%',
        initialValue: null,
        validators: [],
        order: 10
      },
      {
        controlName: 'nextOfKinAddress',
        controlType: 'text',
        controlLabel: 'Next of Kin Address',
        controlWidth: '48%',
        initialValue: null,
        validators: [],
        order: 11
      },
    ]
    this.officialInfoFields.sort((a,b) => (a.order - b.order));
    this.personalInfoFields.sort((a,b) => (a.order - b.order));

    this.officialInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.officialInfoForm.addControl(field.controlName, formControl)
    });
    this.personalInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.personalInfoForm.addControl(field.controlName, formControl)
    });
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

}
