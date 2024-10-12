import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { CrmService } from 'src/app/shared/services/crm/crm.service';

@Component({
  selector: 'app-leads-info',
  templateUrl: './leads-info.component.html',
  styleUrls: ['./leads-info.component.scss']
})
export class LeadsInfoComponent implements OnInit {

  leadsFieldData: any[];
  employees: any[] = [];
  agentsList: any[] = [];

  leadsForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<LeadsInfoComponent>,
    private fb: FormBuilder,
    private crmService: CrmService,     
    private notifyService: NotificationService,
  ) {
    this.setUpForm(); 
  }

  ngOnInit(): void {
  }

  setUpForm() {
    this.agentsList = this.dialogData.agentsList;

    this.leadsFieldData = [
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
        controlName: 'leadType',
        controlType: 'select',
        controlLabel: 'Lead Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Individual: 'Individual',
          Company: 'Company'
        },
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'industry',
        controlType: 'text',
        controlLabel: 'Industry',
        controlWidth: '48%',
        readonly: true,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'jobTitle',
        controlType: 'text',
        controlLabel: 'Job Title',
        controlWidth: '48%',
        readonly: true,
        validators: [],
        order: 4
      },
      {
        controlName: 'leadPriority',
        controlType: 'select',
        controlLabel: 'Lead Priority',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Hot: 'Hot',
          Warm: 'Warm',
          Cold: 'Cold'
        },
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'expectedRevenue',
        controlType: 'text',
        controlLabel: 'Expected Revenue',
        controlWidth: '48%',
        readonly: true,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'conversionProbability',
        controlType: 'text',
        controlLabel: 'Conversion Probability(%)',
        controlWidth: '48%',
        readonly: true,
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'leadScore',
        controlType: 'text',
        controlLabel: 'Lead Score',
        controlWidth: '48%',
        readonly: true,
        validators: [Validators.required],
        order: 7
      },
      {
        controlName: 'leadSource',
        controlType: 'text',
        controlLabel: 'Lead Source',
        controlWidth: '48%',
        readonly: true,
        validators: [Validators.required],
        order: 8
      },
      {
        controlName: 'leadOwnerId',
        controlType: 'select',
        controlLabel: 'Lead Owner',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.agentsList, 'fullName'),
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'assignedAgentId',
        controlType: 'select',
        controlLabel: 'Assigned Agent',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: this.arrayToObject(this.agentsList, 'fullName'),
        validators: [Validators.required],
        order: 10
      },
      {
        controlName: 'description',
        controlType: 'text',
        controlLabel: 'Description',
        controlWidth: '100%',
        initialValue: '',
        validators: [],
        order: 11
      },
    ]

    this.leadsFieldData.sort((a,b) => (a.order - b.order));
    this.leadsForm = this.fb.group({})

    this.leadsFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.leadsForm.addControl(field.controlName, formControl)
    })
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

  removeGuest(guestEmail: string) {
    const selectedGuests = this.leadsForm.value['invitedGuests'] as string[];
    this.removeFirst(selectedGuests, guestEmail);
    this.leadsForm.get['invitedGuests'].setValue(selectedGuests); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onSubmit() {
    console.log(this.leadsForm.value);
    if(this.leadsForm.valid) {
      // let payload = {
      //   firstName: this.leadsForm.value.firstName,
      //   lastName: this.leadsForm.value.lastName,
      //   leadType: this.leadsForm.value.leadType,
      //   industry: this.leadsForm.value.industry,
      //   leadPriority: this.leadsForm.value.leadPriority,
      //   jobTitle: this.leadsForm.value.jobTitle,
      //   expectedRevenue: this.leadsForm.value.expectedRevenue,
      //   conversionProbability: this.leadsForm.value.expectedRevenue,
      // }
      console.log(this.dialogData);
      if(this.dialogData.isExisting) {
        // this.hrService.updateDesignation(data, this.data.id).subscribe({
        //   next: res => {
        //     // console.log(res);
        //     if(res.status == 200) {
        //       if(this.data.isExisting) this.notifyService.showSuccess('This designation has been updated successfully');
        //       else this.notifyService.showSuccess('This designation has been created successfully');
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
        this.crmService.createLead(this.leadsForm.value).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showSuccess('This lead has been created successfully');
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

}
