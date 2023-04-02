import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EmployeeFormData } from '../../models/employee-data';

@Component({
  selector: 'app-create-single-info',
  templateUrl: './create-single-info.component.html',
  styleUrls: ['./create-single-info.component.scss']
})
export class CreateSingleInfoComponent implements OnInit {

  employeeFieldData: EmployeeFormData[];
  employeeForm!: FormGroup
  type: 'text' | 'select';
  @Input() control:string;

  constructor(
    public dialogRef: MatDialogRef<CreateSingleInfoComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.employeeFieldData = [
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
          Male: 'male',
          Female: 'female'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'personalEmail',
        controlType: 'text',
        controlLabel: 'Personal Email Address',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required, Validators.email],
        order: 7
      },
      {
        controlName: 'employmentType',
        controlType: 'select',
        controlLabel: 'Employment Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Contract: 'contract',
          Permanent: 'permanent'
        },
        validators: [Validators.required],
        order: 8
      },
      {
        controlName: 'department',
        controlType: 'select',
        controlLabel: 'Department',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Sales: 'sales',
          Marketing: 'marketing'
        },
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'role',
        controlType: 'text',
        controlLabel: 'Role',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 10
      },
    ]

    this.employeeFieldData.sort((a,b) => (a.order - b.order));
    this.employeeForm = this.fb.group({})

    this.employeeFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.employeeForm.addControl(field.controlName, formControl)
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // get f() {
  //   return this.employeeForm.controls;
  // }

  // get formControl() :AbstractControl {
  //   return this.employeeForm.get(this.control) as AbstractControl;
  // }

  // get isNotValid() {
  //   return this.formControl.invalid && (this.formControl.touched || this.formControl.dirty)
  // }

}
