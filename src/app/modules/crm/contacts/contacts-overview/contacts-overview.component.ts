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
import { ContactInfoComponent } from '../contact-info/contact-info.component';

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './contacts-overview.component.html',
  styleUrls: ['./contacts-overview.component.scss']
})
export class ContactsOverviewComponent implements OnInit {
  agentsList: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  contactsList: any[] = [];
  contactSummary: any[] = [];

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
      key: "image",
      label: "Image",
      order: 2,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "contactId",
      label: "Contact ID",
      order: 3,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "name",
      label: "Name",
      order: 3,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "industry",
      label: "Industry",
      order: 5,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "assignedAgentName",
      label: "Assigned Agent",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "activeStatus",
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

  tableData: any[] = [
    {
      id: 1,
      contactId: '3455680',
      firstName: 'Gustavo',
      lastName: 'Calzoni',
      email: 'gustavocalzoni@gmail.com',
      industry: 'Agriculture',
      jobTitle: 'Sales Coordinator',
      assignedAgent: 'Matthew Ruckford',
      phone: '+44765848840',
      activeStatus: 'active'
    },
    {
      id: 2,
      contactId: '2338743',
      firstName: 'Henry',
      lastName: 'Obaoio',
      email: 'henryobaio@gmail.com',
      industry: 'Technology',
      jobTitle: 'Chief Technical Officer',
      assignedAgent: 'Matthew Ruckford',
      phone: '+44765848840',
      activeStatus: 'active'
    },
    {
      id: 3,
      contactId: '1234455',
      firstName: 'Grace',
      lastName: 'Merrim',
      email: 'gracemerrim@gmail.com',
      industry: 'Politics',
      jobTitle: 'Zonal Leader',
      assignedAgent: 'Sarah Merck',
      phone: '+44765848840',
      activeStatus: 'dormant'
    },
    {
      id: 4,
      contactId: '3487887',
      firstName: 'Walter',
      lastName: 'Percy',
      email: 'walterpercy@gmail.com',
      industry: 'Government',
      jobTitle: 'Civil Servant',
      assignedAgent: 'Sarah Merck',
      phone: '+44765848840',
      activeStatus: 'inactive'
    },
  ]

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

    this.contactSummary = [
      {
        id: 1,
        salesType: "Total Contacts",
        referenceDate: 'Last 30 days',
        salesValue: '6',
        icon: "bi bi-people-fill",
        status: "primary"
      },
      {
        id: 2,
        salesType: "Total Sales Value",
        referenceDate: 'Last 30 days',
        salesValue: '$12k',
        icon: "bi bi-cash-stack",
        status: "pending"
      },
      {
        id: 3,
        salesType: "Total Invoices",
        referenceDate: 'Last 30 days',
        salesValue: '$10k',
        icon: "bi bi-file-earmark-text",
        status: "active"
      },
      {
        id: 4,
        salesType: "Monthly Acquisition Rate",
        referenceDate: 'Last 30 days',
        salesValue: '10%',
        icon: "bi bi-rocket-takeoff",
        status: "warning"
      }
    ]
  }

  getPageData = async () => {
    this.agentsList = await this.crmService.getAgents().toPromise();
    this.contactsList = await this.crmService.getContacts().toPromise();

    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.contactsList['data']);
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

  addNewContact() {
    let dialogRef = this.dialog.open(ContactInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        agentsList: this.agentsList['data'],
        isExisting: false
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPageData();
    }); 
  }

  //Delete a contact
  deleteContact(info: any) {
    console.log(info);
    this.notifyService.confirmAction({
      title: 'Remove Contact',
      message: 'Are you sure you want to remove this contact?',
      confirmText: 'Remove Contact',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        // this.hrService.deleteEmployee(info._id).subscribe({
        //   next: res => {
        //     // console.log(res);
        //     if(res.status == 200) {
        //       this.notifyService.showInfo('This employee has been removed as an agent successfully');
        //     }
        //     this.getPageData();
        //   },
        //   error: err => {
        //     console.log(err)
        //     this.notifyService.showError(err.error.error);
        //   } 
        // })
      }
    });
  }

}
