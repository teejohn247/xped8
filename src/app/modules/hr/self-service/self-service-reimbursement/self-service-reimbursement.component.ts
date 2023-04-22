import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReimbursementTable } from 'src/app/shared/models/reimbursement-data';
import { FormFields } from '../../../../shared/models/form-fields';

@Component({
  selector: 'app-self-service-reimbursement',
  templateUrl: './self-service-reimbursement.component.html',
  styleUrls: ['./self-service-reimbursement.component.scss']
})
export class SelfServiceReimbursementComponent implements OnInit {

  displayedColumns: any[];
  dataSource: MatTableDataSource<ReimbursementTable>;

  expenseRequestFields: FormFields[];
  expenseForm!: FormGroup

  //Leave Request Table Column Names
  tableColumns: TableColumn[] = [
    {
      key: "expenseType",
      label: "Expense Type",
      order: 1,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "amount",
      label: "Amount",
      order: 2,
      columnWidth: "6%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "attachment",
      label: "Attachment",
      order: 4,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "dateRequested",
      label: "Date Requested",
      order: 3,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "approver",
      label: "Approver",
      order: 5,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 6,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "dateRemitted",
      label: "Date Remitted",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 10,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    }
  ]

  tableData: ReimbursementTable[] = [
    {
      id: 1,
      "Employee ID": "EMP-2021-MB45",
      "Expense Type": "Transport Fare",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Used": "Jan 10, 2023",
      "Amount": "£ 100",
      "Attachment": "transportReceipt.pdf",
      "Date Requested": "Jan 12, 2023",
      "Decision Date": "",
      "Date Remitted": "",
      "Approver": "Thomas Jefferson",
      "Status": "Pending"
    },
    {
      id: 2,
      "Employee ID": "EMP-2020-MB25",
      "Expense Type": "Conference Fees",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Used": "Feb 4, 2023",
      "Amount": "£ 700",
      "Attachment": "receipt.pdf",
      "Date Requested": "Feb 10, 2023",
      "Decision Date": "Mar 12, 2023",
      "Date Remitted": "Apr 10, 2023",
      "Approver": "Thomas Jefferson",
      "Status": "Completed"
    },
    {
      id: 3,
      "Employee ID": "EMP-2019-MB03",
      "Expense Type": "Goods Purchase",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Used": "Dec 2, 2023",
      "Amount": "£ 350",
      "Attachment": "invoice.pdf",
      "Date Requested": "Dec 2, 2023",
      "Decision Date": "Dec 12, 2023",
      "Date Remitted": "Dec 17, 2023",
      "Approver": "Rita Smak",
      "Status": "Completed"
    },
    {
      id: 4,
      "Employee ID": "EMP-2021-MB45",
      "Expense Type": "Transport",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Date Used": "Nov 10, 2022",
      "Amount": "£ 50",
      "Attachment": "print.pdf",
      "Date Requested": "Nov 10, 2022",
      "Decision Date": "Nov 12, 2022",
      "Date Remitted": "",
      "Approver": "Rita Smak",
      "Status": "Declined"
    },
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);

    this.expenseRequestFields = [
      {
        controlName: 'expenseType',
        controlType: 'select',
        controlLabel: 'Expense Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Transport: 'transport',
          Purchase: 'purchase',
          General: 'general'
        },
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'expenseDate',
        controlType: 'date',
        controlLabel: 'Expense Date',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'currency',
        controlType: 'select',
        controlLabel: 'Currency',
        controlWidth: '26%',
        initialValue: '',
        selectOptions: {
          '(#)Naira': 'naira',
          '($)Dollar': 'dollar',
          '(£)Pounds': 'pounds',
          '(€)Euro': 'euro'
        },
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'amount',
        controlType: 'text',
        controlLabel: 'Amount',
        controlWidth: '20%',
        initialValue: null,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'upload',
        controlType: 'text',
        controlLabel: 'Attachment',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'description',
        controlType: 'text',
        controlLabel: 'Description',
        controlWidth: '100%',
        initialValue: null,
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'attachment',
        controlType: 'upload',
        controlLabel: 'Attachment',
        controlWidth: '100%',
        initialValue: null,
        validators: [Validators.required],
        order: 6
      },
    ]

    this.expenseRequestFields.sort((a,b) => (a.order - b.order));
    this.expenseForm = this.fb.group({})

    this.expenseRequestFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.expenseForm.addControl(field.controlName, formControl)
    })
  }

}
