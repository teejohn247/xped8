import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-support-overview',
  templateUrl: './support-overview.component.html',
  styleUrls: ['./support-overview.component.scss']
})
export class SupportOverviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  ticketsList: any[] = [];

  //Tickets Table Column Names
  tableColumns: any[] = [
    {
      key: "priority",
      label: "Priority",
      order: 1,
      columnWidth: "4%",
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
      key: "ticketNo",
      label: "Ticket No",
      order: 3,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "email",
      label: "Email Address",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "ticketTitle",
      label: "Ticket Title",
      order: 6,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "phone",
      label: "Phone",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 8,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 9,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }
  ]

  tableData: any[] = [
    {
      id: 1,
      priority: 'high',
      ticketNo: '1672839',
      firstName: 'Gustavo',
      lastName: 'Calzoni',
      email: 'gustavocalzoni@gmail.com',
      ticketTitle: 'Screen UI Glitch',
      phone: '+44765848840',
      status: 'pending'
    },
    {
      id: 2,
      priority: 'medium',
      ticketNo: '1566839',
      firstName: 'Caramel',
      lastName: 'Anthony',
      email: 'gustavocalzoni@gmail.com',
      ticketTitle: 'Unable to access account',
      phone: '+44765848840',
      status: 'completed'
    },
    {
      id: 3,
      priority: 'low',
      ticketNo: '1566839',
      firstName: 'Samuel',
      lastName: 'Grizcof',
      email: 'samuelgrizcof@gmail.com',
      ticketTitle: 'Incessant account time out',
      phone: '+44765848840',
      status: 'investigating'
    }
  ]

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData = async () => {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);
    // console.log(this.contactsList);
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

  viewDetails(id: any) {
    this.router.navigate([id], {relativeTo: this.route});
  }

}
