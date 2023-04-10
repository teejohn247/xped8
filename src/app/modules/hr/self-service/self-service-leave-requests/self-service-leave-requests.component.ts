import { Component, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Chart, Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LeaveRequestTable } from 'src/app/shared/models/leave-requests';
import { FormFields } from '../../../../shared/models/form-fields';

@Component({
  selector: 'app-self-service-leave-requests',
  templateUrl: './self-service-leave-requests.component.html',
  styleUrls: ['./self-service-leave-requests.component.scss']
})
export class SelfServiceLeaveRequestsComponent implements OnInit {

  displayedColumns: any[];
  dataSource: MatTableDataSource<LeaveRequestTable>;

  leaveRequestFields: FormFields[];
  leaveForm!: FormGroup

  leaveBreakdown: any[] = [
    {
      id: 1,
      daysLeft: 5,
      totalDays: 14,
      name: "Paid Leave",
      colorDark: "rgba(66, 133, 244, 1)",
      colorLight: "rgba(66, 133, 244, 0.2)",
      icon: "bi bi-cash"
    },
    {
      id: 2,
      daysLeft: 1,
      totalDays: 2,
      name: "Unpaid Leave",
      colorDark: "rgb(235, 87, 87)",
      colorLight: "rgba(235, 87, 87, 0.2)",
      icon: "bi bi-exclamation-diamond"
    },
    {
      id: 3,
      daysLeft: 1,
      totalDays: 3,
      name: "Sick Leave",
      colorDark: "rgb(191,148,60)",
      colorLight: "rgba(191,148,60, 0.2)",
      icon: "bi bi-bandaid"
    }
  ]

  //Leave Request Table Column Names
  tableColumns: TableColumn[] = [
    {
      key: "leaveType",
      label: "Leave Type",
      order: 1,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "dateSubmitted",
      label: "Date Submitted",
      order: 8,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "startDate",
      label: "Start Date",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "endDate",
      label: "End Date",
      order: 5,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "approver",
      label: "Approver",
      order: 6,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 9,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    // {
    //   key: "dateOfBirth",
    //   label: "Date of Birth",
    //   order: 8,
    //   columnWidth: "8%",
    //   cellStyle: "width: 100%",
    //   sortable: true
    // },
    {
      key: "actions",
      label: "Actions",
      order: 10,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  tableData: LeaveRequestTable[] = [
    {
      id: 1,
      "Employee ID": "EMP-2021-MB45",
      "Leave Type": "Paid",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Submitted": "Jan 10, 2023",
      "Start Date": "Feb 11, 2023",
      "End Date": "Feb 27, 2023",
      "Approver": "Simon Dowen",
      "Status": "Approved"
    },
    {
      id: 2,
      "Employee ID": "EMP-2021-MB45",
      "Leave Type": "Paid",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Submitted": "Feb 4, 2023",
      "Start Date": "Mar 24, 2023",
      "End Date": "April 27, 2023",
      "Approver": "Simon Dowen",
      "Status": "Pending"
    },
    {
      id: 3,
      "Employee ID": "EMP-2021-MB45",
      "Leave Type": "Sick",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Submitted": "Mar 5, 2023",
      "Start Date": "July 11, 2023",
      "End Date": "July 15, 2023",
      "Approver": "Simon Dowen",
      "Status": "Approved"
    },
    {
      id: 4,
      "Employee ID": "EMP-2021-MB45",
      "Leave Type": "Unpaid",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Submitted": "April 20, 2023",
      "Start Date": "Sep 12, 2023",
      "End Date": "Sep 14, 2023",
      "Approver": "Simon Dowen",
      "Status": "Declined"
    },
  ]

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options = {
    chart: {
      type: 'pie',
      plotShadow: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 20,
        borderColor: null,
        slicedOffset: 5,
        dataLabels: {
          connectorWidth: 0,
          enabled: false
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto">{series.name}</span><br>',
      pointFormat: '<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto; color:{point.color}">{point.name}</span>: <b>{point.value}days</b> <br/>'
    },
    title: {
      verticalAlign: 'middle',
      floating: false,
      text: ''
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: 'pie',
        name: 'Leave Days',
        data: [
          {name: 'Days Used', y: 60, value: 21, color: '#f08585'},
          {name: 'Days Left', y: 40, value: 14, color: '#4dc781'},
        ]
      }
    ]
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);

    this.leaveRequestFields = [
      {
        controlName: 'leaveType',
        controlType: 'select',
        controlLabel: 'Leave Type',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: {
          Paid: 'paid',
          Unpaid: 'unpaid',
          Sick: 'sick'
        },
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'startDate',
        controlType: 'date',
        controlLabel: 'Start Date',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'endDate',
        controlType: 'date',
        controlLabel: 'End Date',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'message',
        controlType: 'textarea',
        controlLabel: 'Message',
        controlWidth: '100%',
        initialValue: null,
        validators: [Validators.required],
        order: 4
      },
    ]

    this.leaveRequestFields.sort((a,b) => (a.order - b.order));
    this.leaveForm = this.fb.group({})

    this.leaveRequestFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.leaveForm.addControl(field.controlName, formControl)
    })
  }

}
