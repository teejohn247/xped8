import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-designation-info',
  templateUrl: './designation-info.component.html',
  styleUrls: ['./designation-info.component.scss']
})
export class DesignationInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DesignationInfoComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.designationForm = this.fb.group({})
    this.getLeaveTypes();
  }

  designationFieldData: FormFields[];
  designationForm!: FormGroup;
  leaveTypeList: any[] = [];

  ngOnInit(): void {
    
  }

  getLeaveTypes = async () => {
    this.hrService.getLeaveTypes().subscribe({
      next: res => {
        console.log(res);
        if(res.status == 200) {
          this.leaveTypeList = res.data;
          this.designationFieldData = [
            {
              controlName: 'name',
              controlType: 'text',
              controlLabel: 'Name',
              controlWidth: '100%',
              initialValue: this.data.name,
              validators: [Validators.required],
              order: 1
            },
            {
              controlName: 'description',
              controlType: 'textarea',
              controlLabel: 'Description',
              controlWidth: '100%',
              initialValue: null,
              validators: null,
              order: 2
            }
          ]
          this.leaveTypeList.forEach(leave => {
            this.designationFieldData.push(
              {
                controlName: leave.leaveName,
                controlType: 'number',
                controlLabel: leave.leaveName,
                controlWidth: '48%',
                initialValue: null,
                validators: null,
                order: this.leaveTypeList.indexOf(leave) + 3
              }
            )
          })
          console.log(this.designationFieldData);
          this.designationFieldData.forEach(field => {
            const formControl = this.fb.control(field.initialValue, field.validators)
            this.designationForm.addControl(field.controlName, formControl)
          })
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  createDesignation() {
    if(this.designationForm.valid) {
      let data = {
        designationName: this.designationForm.value.name,
        description: this.designationForm.value.description,
        leaveAssignment: this.leaveTypeList.map(item => {
          let assignedVal = {
            leaveTypeId: item._id,
            noOfLeaveDays: this.designationForm.value[item.leaveName].toString()
          }
          return assignedVal;
        })
      }
      console.log(this.data);
      this.hrService.updateDesignation(data, this.data.id).subscribe({
        next: res => {
          // console.log(res);
          if(res.status == 200) {
            if(this.data.isExisting) this.notifyService.showSuccess('This designation has been updated successfully');
            else this.notifyService.showSuccess('This designation has been created successfully');
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
