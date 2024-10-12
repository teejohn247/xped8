import { Component, Inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CrmService } from 'src/app/shared/services/crm/crm.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { EmployeeFormData } from 'src/app/shared/models/employee-data';
import { Countries } from 'src/app/core/constants/country-list';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  contactTabActive: boolean = false;
  profileImgFile: File;
  profilePic: string | SafeUrl = 'https://onburdstorageaccount.blob.core.windows.net/onburd/public/onburd_fe/assets/onburd-corporate/images/user_profile_icon.svg';

  contactInfoFields: any[];
  contactInfoForm!: FormGroup;
  personalInfoFields: any;
  personalInfoForm!: FormGroup;

  contactDetails: any;
  agentsList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ContactInfoComponent>,
    private hrService: HumanResourcesService,
    private crmService: CrmService,
    private authService: AuthenticationService,     
    private notifyService: NotificationService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.contactDetails = this.dialogData.conatctDetails;
    // console.log(this.employeeDetails);
    this.personalInfoForm = this.fb.group({})
    this.contactInfoForm = this.fb.group({})
    this.setUpForm();    
  }

  ngOnInit(): void {
    
  }

  setUpForm() {
    this.agentsList = this.dialogData.agentsList;
    // this.departmentList = this.dialogData.departmentList;
    // this.designationList = this.dialogData.designationList;

    this.personalInfoFields = [
      {
        controlName: 'firstName',
        controlType: 'text',
        controlLabel: 'First Name',
        controlWidth: '48%',
        // readonly: !this.loggedInUser.isSuperAdmin,
        initialValue: this.contactDetails?.firstName,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'lastName',
        controlType: 'text',
        controlLabel: 'Last Name',
        controlWidth: '48%',
        // readonly: !this.loggedInUser.isSuperAdmin,
        initialValue: this.contactDetails?.lastName,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'contactType',
        controlType: 'select',
        controlLabel: 'Contact Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Individual: 'Individual',
          Company: 'Company'
        },
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'onboardingDate',
        controlType: 'date',
        controlLabel: 'Onboarding Date',
        controlWidth: '48%',
        initialValue:  '',
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'organization',
        controlType: 'text',
        controlLabel: 'Organization',
        controlWidth: '48%',
        readonly: true,
        initialValue: this.contactDetails?.organization,
        validators: [Validators.required],
        order: 7
      },
      {
        controlName: 'industry',
        controlType: 'text',
        controlLabel: 'Industry',
        controlWidth: '48%',
        readonly: true,
        initialValue: this.contactDetails?.industry,
        validators: [Validators.required],
        order: 8
      },
      {
        controlName: 'jobRole',
        controlType: 'text',
        controlLabel: 'Job Role',
        controlWidth: '48%',
        readonly: true,
        initialValue: this.contactDetails?.jobRole,
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'contactOwner',
        controlType: 'select',
        controlLabel: 'Contact Owner',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.agentsList, 'fullName'),
        validators: [Validators.required],
        order: 10
      },
      {
        controlName: 'assignedAgent',
        controlType: 'select',
        controlLabel: 'Assigned Agent',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.agentsList, 'fullName'),
        validators: [Validators.required],
        order: 11
      },
    ]

    this.contactInfoFields = [
      {
        controlName: 'email',
        controlType: 'text',
        controlLabel: 'Email Address',
        controlWidth: '48%',
        initialValue: this.contactDetails?.email,
        validators: [Validators.required, Validators.email],
        order: 1
      },
      {
        controlName: 'phoneNo',
        controlType: 'text',
        controlLabel: 'Phone Number',
        controlWidth: '48%',
        // readonly: !this.loggedInUser.isSuperAdmin,
        initialValue: this.contactDetails?.phoneNumber,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'address',
        controlType: 'text',
        controlLabel: 'Personal Address',
        controlWidth: '100%',
        initialValue: this.contactDetails?.address,
        validators: [],
        order: 3
      },
      {
        controlName: 'city',
        controlType: 'text',
        controlLabel: 'City',
        controlWidth: '48%',
        initialValue: this.contactDetails?.city,
        validators: [],
        order: 4
      },
      {
        controlName: 'state',
        controlType: 'text',
        controlLabel: 'State',
        controlWidth: '48%',
        initialValue: this.contactDetails?.city,
        validators: [],
        order: 5
      },
      {
        controlName: 'country',
        controlType: 'select',
        controlLabel: 'Country',
        controlWidth: '48%',
        initialValue: this.contactDetails?.country,
        selectOptions: this.createCountryOptions(),
        validators: [],
        order: 6
      },
      {
        controlName: 'zipCode',
        controlType: 'text',
        controlLabel: 'Postal Code',
        controlWidth: '48%',
        initialValue: this.contactDetails?.zipCode,
        validators: [],
        order: 7
      },
      {
        controlName: 'officeLocation',
        controlType: 'text',
        controlLabel: 'Office Location',
        controlWidth: '100%',
        initialValue: this.contactDetails?.address,
        validators: [],
        order: 9
      },
    ]

    this.contactInfoFields.sort((a,b) => (a.order - b.order));
    this.personalInfoFields.sort((a,b) => (a.order - b.order));

    this.contactInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.contactInfoForm.addControl(field.controlName, formControl)
    });
    this.personalInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.personalInfoForm.addControl(field.controlName, formControl)
    });
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

  //Converts an array to an Object of key value pairs
  arrayToObject(arrayVar, key:string) {
    let reqObj = {}
    reqObj = arrayVar.reduce((agg, item, index) => {
      agg[item['_id']] = item[key];
      return agg;
    }, {})
    //console.log(reqObj);
    return reqObj;
  }

  createCountryOptions() {
    let reqObj = {}
    reqObj = Countries.reduce((agg, item, index) => {
      agg[item['label']] = item['label'];
      return agg;
    }, {})
    //console.log(reqObj);
    return reqObj;
  }

  // Convert dd-mm-yyyy to date object
  convertToDate(dateString: any) {
    let d = dateString.split("-");
    let newFormat = new Date(d[2] + '-' + d[1] + '-' + d[0]);
    return newFormat;     
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('profilePhoto', this.profileImgFile);
    formData.append('firstName', this.personalInfoForm.value.firstName);
    formData.append('lastName', this.personalInfoForm.value.lastName);
    formData.append('contactType', this.personalInfoForm.value.contactType);
    formData.append('onboardingDate', this.personalInfoForm.value.onboardingDate);
    formData.append('organization', this.personalInfoForm.value.organization);
    formData.append('industry', this.personalInfoForm.value.industry);
    formData.append('jobRole', this.personalInfoForm.value.jobRole);
    formData.append('contactOwnerId', this.personalInfoForm.value.contactOwner);
    formData.append('assignedAgentId', this.personalInfoForm.value.assignedAgent);

    formData.append('email', this.contactInfoForm.value.email);
    formData.append('phoneNumber', this.contactInfoForm.value.phoneNo);
    formData.append('address', this.contactInfoForm.value.address ? this.contactInfoForm.value.address : '');
    formData.append('city', this.contactInfoForm.value.city ? this.contactInfoForm.value.city : '');
    formData.append('state', this.contactInfoForm.value.state ? this.contactInfoForm.value.state : '');
    formData.append('country', this.contactInfoForm.value.country ? this.contactInfoForm.value.country : '');
    formData.append('postCode', this.contactInfoForm.value.postCode ? this.contactInfoForm.value.postCode : '');
    formData.append('officeLocation', this.contactInfoForm.value.officeLocation ? this.contactInfoForm.value.officeLocation : '');

    if(this.dialogData.isExisting) {
      // this.hrService.updateEmployeeByAdmin(formData, this.employeeDetails._id).subscribe({
      //   next: res => {
      //     // console.log(res);
      //     if(res.status == 200) {
      //       this.notifyService.showSuccess('This employee has been updated successfully');
      //       this.dialogRef.close();
      //     }
      //     //this.getPageData();
      //   },
      //   error: err => {
      //     console.log(err)
      //     this.notifyService.showError(err.error.error);
      //   } 
      // })
    }
    else {
      this.crmService.createContact(formData).subscribe({
        next: res => {
          // console.log(res);
          if(res.status == 200) {
            this.notifyService.showSuccess('This agent has been created successfully');
            this.dialogRef.close();
          }
          //this.getPageData();
        },
        error: err => {
          console.log(err)
          this.notifyService.showError(err.error.error);
        } 
      })
    }
  }

}
