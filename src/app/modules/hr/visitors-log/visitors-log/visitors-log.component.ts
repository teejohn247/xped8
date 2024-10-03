import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import { VisitorsTable } from 'src/app/shared/models/visitor-data';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { RegisterGuestComponent } from 'src/app/shared/components/register-guest/register-guest.component';

@Component({
  selector: 'app-visitors-log',
  templateUrl: './visitors-log.component.html',
  styleUrls: ['./visitors-log.component.scss']
})
export class VisitorsLogComponent implements OnInit {

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  todaysDate = new  Date();

  employeeList: any[] = [];
  guestsList: any[] = [];

  visitorSummary: any[] = []

  //Visitor Log Table Column Names
  tableColumns: TableColumn[] = [
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
      key: "visitDate",
      label: "Visit Date",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "guestName",
      label: "Name",
      order: 3,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "employeeName",
      label: "Host",
      order: 5,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "purpose",
      label: "Purpose",
      order: 6,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "checkIn",
      label: "Check In",
      order: 7,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "checkOut",
      label: "Check Out",
      order: 8,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 9,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  tableData: any[] = [
    {
      id: 1,
      "Name": "Diane Bell",
      "Image": "staff1.jpg",
      "Host": "Gregory Luke",
      "Purpose": "Interview",
      "Visit Date": "Feb 11, 2023",
      "Check In": "08:40 AM",
      "Check Out": "",
      "Status": "Active"
    },
    {
      id: 2,
      "Name": "Ricardo Miles",
      "Image": "staff3.jpg",
      "Host": "Michael Josh",
      "Purpose": "Courier",
      "Visit Date": "April 11, 2023",
      "Check In": "11:20 AM",
      "Check Out": "04:30 PM",
      "Status": "Inactive"
    },
    {
      id: 3,
      "Name": "Jamie Robertson",
      "Image": "staff2.jpg",
      "Host": "Ann Fisher",
      "Purpose": "Official",
      "Visit Date": "May 27, 2023",
      "Check In": "",
      "Check Out": "",
      "Status": "Expected"
    },
    {
      id: 4,
      "Name": "Lee Henry",
      "Image": "staff1.jpg",
      "Host": "Fisher Spikes",
      "Purpose": "Interview",
      "Visit Date": "May 11, 2023",
      "Check In": "08:40 AM",
      "Check Out": "",
      "Status": "Overstay"
    },
  ]

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getPageData();
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
  }

  getPageData = async () => {
    this.employeeList = await this.hrService.getEmployees().toPromise();
    this.guestsList = await this.hrService.getGuestsList().toPromise();
    console.log(this.guestsList);
    this.generateVisitorSummary();
    // this.departmentList = await this.hrService.getDepartments().toPromise();
    // this.designationList = await this.hrService.getDesignations().toPromise();
    this.dataSource = new MatTableDataSource(this.guestsList['data']);
    // this.dataSource.sort = this.sort;
  }

  generateVisitorSummary() {
    this.visitorSummary = [
      {
        id: 1,
        visitorType: "Total Visitors",
        referenceDate: this.todaysDate,
        visitorCount: this.guestsList['data'].length,
        icon: "bi bi-people-fill",
        status: "total"
      },
      {
        id: 2,
        visitorType: "Active Visitors",
        referenceDate: this.todaysDate,
        visitorCount: this.guestsList['data'].filter(x => {return x.status == 'Active'}).length,
        icon: "bi bi-person-fill-check",
        status: "active"
      },
      {
        id: 3,
        visitorType: "Overstay Visitors",
        referenceDate: this.todaysDate,
        visitorCount: this.guestsList['data'].filter(x => {return x.status == 'Overstay'}).length,
        icon: "bi bi-person-fill-exclamation",
        status: "overstay"
      },
      {
        id: 4,
        visitorType: "Expected Visitors",
        referenceDate: this.todaysDate,
        visitorCount: this.guestsList['data'].filter(x => {return x.status == 'Expected'}).length,
        icon: "bi bi-person-fill-slash",
        status: "expected"
      },
    ]
    this.guestsList['data'].map(guest => {

    })
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

  strToDate(dateVal: string, key:string) {
    if(key == 'visitDate') {
      let newFormat = new Date(dateVal);
      // console.log(newFormat.toDateString());
      return this.datePipe.transform(newFormat, 'd MMMM, y')
    }
    else if(key = 'checked') {
      let newFormat = new Date(dateVal);
      // console.log(newFormat.toDateString());
      return this.datePipe.transform(newFormat, 'shortTime')
    }
    else {
      const [day, month, year] = dateVal.split('-');
      let newFormat = new Date(+year, +month - 1, +day);
      // console.log(newFormat.toDateString());
      return this.datePipe.transform(newFormat, 'd MMMM, y')
    }    
  }

  addNewVisitor() {
    const dialogRef = this.dialog.open(RegisterGuestComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: false,
        employeeList: this.employeeList['data']
      },
    });
  }

  checkInVisitor(bookingId: string) {
    let currentDate = new Date();
    let data = {
      checkInTime: currentDate,
    }
    console.log(data);
    this.hrService.checkInVisitor(data, bookingId).subscribe({
      next: res => {
        console.log(res);
        if(res.status == 200) {
          this.notifyService.showSuccess('This visitor has been checked in successfully');
          this.getPageData();
        }
      },
      error: err => {
        console.log(err)
        this.notifyService.showError(err.error.error);
      } 
    })
  }

  checkOutVisitor(bookingId: string) {
    let currentDate = new Date();
    let data = {
      checkOutTime: currentDate,
    }
    console.log(data);
    this.hrService.checkOutVisitor(data, bookingId).subscribe({
      next: res => {
        console.log(res);
        if(res.status == 200) {
          this.notifyService.showSuccess('This visitor has been checked out successfully');
          this.getPageData();
        }
      },
      error: err => {
        console.log(err)
        this.notifyService.showError(err.error.error);
      } 
    })
  }

  //Delete a visitor
  deleteMeeting(info: any) {
    console.log(info);
    this.notifyService.confirmAction({
      title: 'Cancel Meeting',
      message: 'Are you sure you want to cancel this visitor?',
      confirmText: 'Cancel Meeting',
      cancelText: 'Keep Meeting',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteMeeting(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('This meeting has been deleted successfully');
            }
            this.getPageData();
          },
          error: err => {
            console.log(err)
            this.notifyService.showError(err.error.error);
          } 
        })
      }
    });
  }

}
