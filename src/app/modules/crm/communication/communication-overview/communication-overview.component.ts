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
import { CrmService } from 'src/app/shared/services/crm/crm.service';

@Component({
  selector: 'app-communication-overview',
  templateUrl: './communication-overview.component.html',
  styleUrls: ['./communication-overview.component.scss']
})
export class CommunicationOverviewComponent implements OnInit {

  sideModalOpened: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  messagesList: any[] = [];
  communicationSummary: any[] = [];

  //Contacts Table Column Names
  tableColumns: any[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "4%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "messageType",
      label: "Message Type",
      order: 2,
      columnWidth: "3%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "subject",
      label: "Subject",
      order: 4,
      columnWidth: "20%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "recepients",
      label: "Recepients",
      order: 3,
      columnWidth: "17%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "message",
      label: "Message",
      order: 5,
      columnWidth: "30%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "date",
      label: "Date",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 8,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  tableData = [
    {
      id: 1,
      messageType: 'email',
      subject: 'Sequels Advert',
      message: `Sequels CAN be better than the original, because we're getting better every day`,
      recepients: 'gustavocalzoni@gmail.com',
      date: '12 August',
      status: 'delivered',
    },
    {
      id: 2,
      messageType: 'sms',
      subject: 'Sequels Registration',
      message: `We're getting better every day and we just want you to be`,
      recepients: 'matteo@yopmail.com',
      date: '21 June',
      status: 'notDelivered',
    },
    {
      id: 3,
      messageType: 'newsletter',
      subject: 'International Conference',
      message: `We're getting better every day and we just want you to be`,
      recepients: 'Multiple Emails',
      date: '21 October',
      status: 'pending',
    },
  ];

  // tableData: any[] = [
  //   {
  //     id: 1,
  //     contactId: '3455680',
  //     firstName: 'Gustavo',
  //     lastName: 'Calzoni',
  //     email: 'gustavocalzoni@gmail.com',
  //     industry: 'Agriculture',
  //     jobTitle: 'Sales Coordinator',
  //     assignedAgent: 'Matthew Ruckford',
  //     phone: '+44765848840',
  //     activeStatus: 'active'
  //   },
  //   {
  //     id: 2,
  //     contactId: '2338743',
  //     firstName: 'Henry',
  //     lastName: 'Obaoio',
  //     email: 'henryobaio@gmail.com',
  //     industry: 'Technology',
  //     jobTitle: 'Chief Technical Officer',
  //     assignedAgent: 'Matthew Ruckford',
  //     phone: '+44765848840',
  //     activeStatus: 'active'
  //   },
  //   {
  //     id: 3,
  //     contactId: '1234455',
  //     firstName: 'Grace',
  //     lastName: 'Merrim',
  //     email: 'gracemerrim@gmail.com',
  //     industry: 'Politics',
  //     jobTitle: 'Zonal Leader',
  //     assignedAgent: 'Sarah Merck',
  //     phone: '+44765848840',
  //     activeStatus: 'dormant'
  //   },
  //   {
  //     id: 4,
  //     contactId: '3487887',
  //     firstName: 'Walter',
  //     lastName: 'Percy',
  //     email: 'walterpercy@gmail.com',
  //     industry: 'Government',
  //     jobTitle: 'Civil Servant',
  //     assignedAgent: 'Sarah Merck',
  //     phone: '+44765848840',
  //     activeStatus: 'inactive'
  //   },
  // ]

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private crmService: CrmService,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getPageData();

    this.communicationSummary = [
      {
        id: 1,
        summaryType: "Total Messages",
        referenceDate: 'Last 12 Months',
        summaryValue: '100',
        icon: "bi bi-megaphone-fill",
        status: "active"
      },
      {
        id: 2,
        summaryType: "Total Email Messages",
        referenceDate: 'Last 12 Months',
        summaryValue: '58',
        icon: "bi bi-envelope-at-fill",
        status: "pending"
      },
      {
        id: 3,
        summaryType: "Total SMS Messages",
        referenceDate: 'Last 12 Months',
        summaryValue: '43',
        icon: "bi bi-phone-fill",
        status: "primary"
      },
      {
        id: 4,
        summaryType: "Messages Pending",
        referenceDate: 'Last 12 Months',
        summaryValue: '17',
        icon: "bi bi-envelope-exclamation-fill",
        status: "warning"
      }
    ]
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

}
