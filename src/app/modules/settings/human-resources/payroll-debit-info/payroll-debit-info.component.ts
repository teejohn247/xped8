import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-payroll-debit-info',
  templateUrl: './payroll-debit-info.component.html',
  styleUrls: ['./payroll-debit-info.component.scss']
})
export class PayrollDebitInfoComponent implements OnInit {

  payrollFieldData: FormFields[];
  payrollDebitForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PayrollDebitInfoComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.payrollDebitForm = this.fb.group({})

    this.payrollFieldData = [
      {
        controlName: 'name',
        controlType: 'text',
        controlLabel: 'Name',
        controlWidth: '100%',
        initialValue: this.data.isExisting ? this.data.modalInfo.name : this.data.name,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'description',
        controlType: 'textarea',
        controlLabel: 'Description',
        controlWidth: '100%',
        initialValue: this.data.isExisting ? this.data.modalInfo.description : null,
        validators: null,
        order: 2
      }
    ]

    this.payrollFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.payrollDebitForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {}
}
