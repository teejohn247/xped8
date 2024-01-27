import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormFields } from 'src/app/shared/models/form-fields';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/shared/models/table-columns';
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
  matrixSelectOptions: any;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;

  kpiCriteria = [
    {
      groupName: 'General',
      groupKpis: [
        {
          kpiName: 'Company Values',
          kpiDescription: 'How well do you keep the values of the company?'
        }
      ]
    },
    {
      groupName: 'Development',
      groupKpis: [
        {
          kpiName: 'Excellence',
          kpiDescription: 'How well do you pay attention to details?'
        },
        {
          kpiName: 'Technical Knowledge',
          kpiDescription: 'How well do you know about technical functionalities?'
        }
      ]
    },
    {
      groupName: 'Sales',
      groupKpis: [
        {
          kpiName: 'Return on investment',
          kpiDescription: 'How effective was your sales reach?'
        },
        {
          kpiName: 'Customer Conversion',
          kpiDescription: 'How many customers are you able to reach out to?'
        }
      ]
    }
  ]

  //KPI Ratings Table Column Names
  tableColumns: TableColumn[] = [
    // {
    //   key: "kpiName",
    //   label: "KPI Name",
    //   order: 1,
    //   columnWidth: "16%",
    //   cellStyle: "width: 100%",
    //   sortable: false
    // },
    {
      key: "kpiDescription",
      label: "KPI Description",
      order: 2,
      columnWidth: "24%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "employeeRating",
      label: "Employee Rating",
      order: 3,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "employeeComments",
      label: "Employee Comments",
      order: 4,
      columnWidth: "20%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "managerRating",
      label: "Manager Rating",
      order: 5,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "managerComments",
      label: "Manager Comments",
      order: 6,
      columnWidth: "20%",
      cellStyle: "width: 100%",
      sortable: true
    },

  ]

  constructor(
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.appraisalForm = this.fb.group({})
    this.matrixSelectOptions = {
      Low: 'Low',
      Moderate: 'Moderate',
      High: 'High'
    }

    this.appraisalFormFields = [
      {
        controlName: 'employeeName',
        controlType: 'text',
        controlLabel: 'Employee Name',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 1
      },
      {
        controlName: 'employeeSignature',
        controlType: 'text',
        controlLabel: 'Employee Signature',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 1
      },
      {
        controlName: 'employeeSignDate',
        controlType: 'text',
        controlLabel: 'Employee Signature Date',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 2
      },
      {
        controlName: 'employeePotential',
        controlType: 'select',
        controlLabel: 'Employee Potential',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Low: 'Low',
          Moderate: 'Moderate',
          High: 'High'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'employeePerformance',
        controlType: 'select',
        controlLabel: 'Employee Performance',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Low: 'Low',
          Moderate: 'Moderate',
          High: 'High'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'managerSummary',
        controlType: 'text',
        controlLabel: 'Manager Summary',
        controlWidth: '100%',
        initialValue: '',
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'managerName',
        controlType: 'text',
        controlLabel: 'Manager Name',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 4
      },
      {
        controlName: 'managerSignature',
        controlType: 'text',
        controlLabel: 'Manager Signature',
        controlWidth: '100%',
        initialValue: '',
        validators: null,
        order: 5
      },
      {
        controlName: 'managerSignDate',
        controlType: 'text',
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

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
  }


}
