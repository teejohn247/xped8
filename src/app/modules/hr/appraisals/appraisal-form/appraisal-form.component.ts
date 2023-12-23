import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-appraisal-form',
  templateUrl: './appraisal-form.component.html',
  styleUrls: ['./appraisal-form.component.scss']
})
export class AppraisalFormComponent implements OnInit {

  appraisalFormFields: FormFields[];
  appraisalForm!: FormGroup;

  kpiCriteria = [
    {
      id: 1,
      grpLabel: 'General',
      grpKpis: [
        {
          id: 1,
          kpiLabel: 'Dependability',
          kpiDescription: 'Degree of supervision to carry out tasks'
        },
        {
          id: 2,
          kpiLabel: 'Adaptability',
          kpiDescription: 'Ability to learn quickly'
        },
        {
          id: 3,
          kpiLabel: 'Cooperation',
          kpiDescription: 'Ability to work effectively with co-workers'
        },
      ]
    },
    {
      id: 2,
      grpLabel: 'Software Development',
      grpKpis: [
        {
          id: 1,
          kpiLabel: 'Clean code architecture',
          kpiDescription: 'Degree of supervision to carry out tasks'
        },
        {
          id: 2,
          kpiLabel: 'Logical Reasoning',
          kpiDescription: 'Ability to learn quickly'
        },
        {
          id: 3,
          kpiLabel: 'Innovation',
          kpiDescription: 'Ability to work effectively with co-workers'
        },
      ]
    }
  ]

  constructor(
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.appraisalForm = this.fb.group({})

    this.appraisalFormFields = [
      {
        controlName: 'employeeName',
        controlType: 'text',
        controlLabel: 'Employee Name',
        controlWidth: '100%',
        initialValue: '',
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'employeeSignature',
        controlType: 'text',
        controlLabel: 'Employee Signature',
        controlWidth: '100%',
        initialValue: '',
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'employeeSignDate',
        controlType: 'date',
        controlLabel: 'Employee Signature Date',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 2
      },
      {
        controlName: 'managerName',
        controlType: 'text',
        controlLabel: 'Manager Name',
        controlWidth: '100%',
        initialValue: '',
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'managerSignature',
        controlType: 'text',
        controlLabel: 'Manager Signature',
        controlWidth: '100%',
        initialValue: '',
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'managerSignDate',
        controlType: 'date',
        controlLabel: 'Manager Signature Date',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 6
      }
    ]

    this.appraisalFormFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.appraisalForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
  }

}
