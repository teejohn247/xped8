import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeData, EmployeeTable } from 'src/app/shared/models/employee-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { CreateSingleInfoComponent } from 'src/app/shared/components/create-single-info/create-single-info.component';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: any[];
  dataSource: MatTableDataSource<EmployeeData>;
  selection = new SelectionModel<EmployeeData>(true, []);

  //Employee Table Column Names
  tableColumns: EmployeeTable[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "2%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "image",
      label: "Image",
      order: 2,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "employeeId",
      label: "Employee ID",
      order: 3,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "firstName",
      label: "First Name",
      order: 4,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "lastName",
      label: "Last Name",
      order: 5,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "officialEmail",
      label: "Email Address",
      order: 6,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "phoneNo",
      label: "Phone Number",
      order: 7,
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
      key: "department",
      label: "Department",
      order: 8,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "role",
      label: "Role",
      order: 9,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 10,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  employeeData : EmployeeData[] = [
    {
      id: 1,
      "Employee ID": "EMP-2021-MB45",
      "Image": "staff1.jpg",
      "First Name": "Mellie",
      "Last Name": "Gabbott",
      "Email Address": "mellie.gabbott@silo.com",
      "Phone Number": "+234 845 2345 566",
      "Department": "Marketing",
      "Role": "Marketing Manager"
    },
    {
      id: 2,
      "Employee ID": "EMP-2021-YA65",
      "Image": "staff2.jpg",
      "First Name": "Yehudi",
      "Last Name": "Ainsby",
      "Email Address": "yehudi.ainsby@silo.com",
      "Phone Number": "+234 355 2445 586",
      "Department": "Technical",
      "Role": "Support Analyst"
    },
    {
      id: 3,
      "Employee ID": "EMP-2020-NP50",
      "Image": "profile-img.jpg",
      "First Name": "Noellyn",
      "Last Name": "Primett",
      "Email Address": "noellyn.primett@silo.com",
      "Phone Number": "+234 355 2445 586",
      "Department": "Sales",
      "Role": "Business Analyst"
    },
    {
      id: 4,
      "Employee ID": "EMP-2020-YS30",
      "Image": "staff3.jpg",
      "First Name": "Yurenin",
      "Last Name": "Stefanieg",
      "Email Address": "yurenin.staefanieg@silo.com",
      "Phone Number": "+234 355 2445 586",
      "Department": "Technical",
      "Role": "Senior Officer"
    },
  ]

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.employeeData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addNewEmployee() {
    const dialogRef = this.dialog.open(CreateSingleInfoComponent, {
      width: '35%',
      height: 'auto',
      //data: { isUpdate: false },
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.getCustomers();
    //   this.dataSource = new MatTableDataSource<CustomerList>(this.customers);
    // }); 
  }

  deleteEmployee() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '40%',
      height: 'auto',
    });
    // dialogRef.componentInstance.studentId = studentId;
    // dialogRef.afterClosed().subscribe(() => {
    //   this.getStudents();
    //   this.dataSource = new MatTableDataSource<Students>(this.students);
    // });
  }

  viewEmployee() {
    this.router.navigateByUrl('app/human-resources/employees/employee-details');
  }

}
