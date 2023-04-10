import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { PayrollSummary } from 'src/app/shared/models/payroll-data';

@Component({
  selector: 'app-self-service-payroll',
  templateUrl: './self-service-payroll.component.html',
  styleUrls: ['./self-service-payroll.component.scss']
})
export class SelfServicePayrollComponent implements OnInit {

  displayedColumns: any[];
  dataSource: MatTableDataSource<PayrollSummary>;

  //Payroll Summary Table Column Names
  tableColumns: TableColumn[] = [
    {
      key: "paymentReference",
      label: "Reference",
      order: 1,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "payrollName",
      label: "Payroll Name",
      order: 2,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "payPeriod",
      label: "Pay Period",
      order: 3,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "grossPay",
      label: "Gross Pay",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "deductions",
      label: "Deductions",
      order: 9,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "netPay",
      label: "Net Pay",
      order: 10,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 11,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 12,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  tableData: PayrollSummary[] = [
    {
      id: 1,
      "Reference": "OCT-0345-211",
      "Payroll Name": "October 1st Period",
      "Pay Period": "Oct 1, 2022 - Oct 15, 2022",
      "Employee Count": 43,
      "Gross Pay": "£34,590.45",
      "Deductions": "£5,890.00",
      "Net Pay": "£29,344.50",
      "Status": "Completed"
    },
    {
      id: 2,
      "Reference": "OCT-0335-251",
      "Payroll Name": "October 2nd Period",
      "Pay Period": "Oct 16, 2022 - Oct 31, 2022",
      "Employee Count": 46,
      "Gross Pay": "£37,790.45",
      "Deductions": "£4,990.00",
      "Net Pay": "£33,484.50",
      "Status": "Completed"
    },
    {
      id: 3,
      "Reference": "NOV-0325-211",
      "Payroll Name": "November Period",
      "Pay Period": "Nov 1, 2022 - Nov 30, 2022",
      "Employee Count": 56,
      "Gross Pay": "£57,590.45",
      "Deductions": "£7,290.00",
      "Net Pay": "£50,344.00",
      "Status": "Processing"
    },
    {
      id: 4,
      "Reference": "DEC-0745-211",
      "Payroll Name": "December Period",
      "Pay Period": "Dec 1, 2022 - Dec 31, 2022",
      "Employee Count": 51,
      "Gross Pay": "£53,590.45",
      "Deductions": "£4,100.00",
      "Net Pay": "£49,344.35",
      "Status": "Completed"
    },
  ]

  AreaHighcharts: typeof Highcharts = Highcharts;
  areaChartOptions: Highcharts.Options = {
    title: {
      text: "Gross Pay"
    },
    credits: {
      enabled: false
    },
    xAxis:{
      categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      //labels: {enabled:false}
    },
    yAxis: {          
      title:{
        text:"Pounds"
      },
      labels: {
        formatter: function () {
          return '£' + this.axis.defaultLabelFormatter.call(this) + 'K';
        }            
      }
    },
    tooltip: {
      valuePrefix:"£",
      valueSuffix:"K",
    },
    //colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    colors: ['#4db1ff'],
    series: [
      {
        type: 'areaspline',
        name: 'Gross Pay',
        data: [2.9, 3.2, 2.7, 3.5, 2.9, 2.2, 3.0, 3.6, 3.2, 3.3, 3.6, 4.8],
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#4db1ff'],
            [1, Highcharts.color('#4db1ff').setOpacity(0).get('rgba') as string],
          ],
        },
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);
  }

}
