import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveRequestTable } from 'src/app/shared/models/leave-requests';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { LeaveReviewComponent } from 'src/app/shared/components/leave-review/leave-review.component';

@Component({
  selector: 'app-leave-management-overview',
  templateUrl: './leave-management-overview.component.html',
  styleUrls: ['./leave-management-overview.component.scss']
})
export class LeaveManagementOverviewComponent implements OnInit {

  displayedColumns: any[];
  requestedApprovals: any[] = [];
  leaveTypeList: any[] = [];
  dataSource: MatTableDataSource<LeaveRequestTable>;
  selection = new SelectionModel<LeaveRequestTable>(true, []);

  requestMatrix = [
    {
      id: 1,
      label: "21+",
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
      ]
    },
    {
      id: 2,
      label: "15-21",
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
      ]
    },
    {
      id: 3,
      label: "8-14",
      staff: [
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
      ]
    },
    {
      id: 4,
      label: "0-7",
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
      ]
    },
  ]

  //Leave Request Table Column Names
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
      columnWidth: "6%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "fullName",
      label: "Name",
      order: 3,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "leaveTypeName",
      label: "Leave Type",
      order: 2,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "requestDate",
      label: "Date Submitted",
      order: 8,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "leaveStartDate",
      label: "Start Date",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "leaveEndDate",
      label: "End Date",
      order: 5,
      columnWidth: "13%",
      cellStyle: "width: 100%",
      sortable: true
    },
    // {
    //   key: "approver",
    //   label: "Approver",
    //   order: 6,
    //   columnWidth: "12%",
    //   cellStyle: "width: 100%",
    //   sortable: true
    // },
    {
      key: "status",
      label: "Status",
      order: 9,
      columnWidth: "8%",
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
    // {
    //   id: 1,
    //   "Image": "staff1.jpg",
    //   "Employee ID": "EMP-2021-MB45",
    //   "Leave Type": "Paid",
    //   "First Name": "Mellie",
    //   "Last Name": "Gabbott",
    //   "Date Submitted": "Jan 10, 2023",
    //   "Start Date": "Feb 11, 2023",
    //   "End Date": "Feb 27, 2023",
    //   "Approver": "Simon Dowen",
    //   "Status": "Approved"
    // },
    // {
    //   id: 2,
    //   "Image": "staff2.jpg",
    //   "Employee ID": "EMP-2021-MB45",
    //   "Leave Type": "Paid",
    //   "First Name": "Richard",
    //   "Last Name": "Wayne",
    //   "Date Submitted": "Feb 4, 2023",
    //   "Start Date": "Mar 24, 2023",
    //   "End Date": "April 27, 2023",
    //   "Approver": "Simon Dowen",
    //   "Status": "Pending"
    // },
    // {
    //   id: 3,
    //   "Image": "staff3.jpg",
    //   "Employee ID": "EMP-2021-MB45",
    //   "Leave Type": "Sick",
    //   "First Name": "Harry",
    //   "Last Name": "Mettle",
    //   "Date Submitted": "Mar 5, 2023",
    //   "Start Date": "July 11, 2023",
    //   "End Date": "July 15, 2023",
    //   "Approver": "Simon Dowen",
    //   "Status": "Approved"
    // },
    // {
    //   id: 4,
    //   "Image": "profile-img.jpg",
    //   "Employee ID": "EMP-2021-MB45",
    //   "Leave Type": "Unpaid",
    //   "First Name": "Kate",
    //   "Last Name": "Kripsy",
    //   "Date Submitted": "April 20, 2023",
    //   "Start Date": "Sep 12, 2023",
    //   "End Date": "Sep 14, 2023",
    //   "Approver": "Simon Dowen",
    //   "Status": "Declined"
    // },
  ]

  constructor(
    private hrService: HumanResourcesService,
    private notifyService: NotificationService,     
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) {
    this.getPageData();
  }

  ngOnInit(): void {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);
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

  getPageData = async () => {
    this.requestedApprovals = await this.hrService.getRequestedLeaveApprovals().toPromise();
    this.leaveTypeList = await this.hrService.getLeaveTypes().toPromise();
    // console.log(this.leaveTypeList);
    this.dataSource = new MatTableDataSource(this.requestedApprovals['data']);
    console.log(this.requestedApprovals);
  }

  strToDate(dateVal: string, key:string) {
    if(key == 'requestDate') {
      let newFormat = new Date(dateVal);
      // console.log(newFormat.toDateString());
      return this.datePipe.transform(newFormat, 'd MMMM, y')
    }
    else {
      const [day, month, year] = dateVal.split('-');
      let newFormat = new Date(+year, +month - 1, +day);
      // console.log(newFormat.toDateString());
      return this.datePipe.transform(newFormat, 'd MMMM, y')
    }    
  }

  actionRequest(details: any) {
    this.dialog.open(LeaveReviewComponent, {
      width: '30%',
      height: 'auto',
      data: {
        id: details._id,
        isExisting: true,
        modalInfo: details,
        leaveTypes: this.leaveTypeList['data'], 
        forApproval: true
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

}
