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
import { LeadsInfoComponent } from '../leads-info/leads-info.component';

@Component({
  selector: 'app-leads-overview',
  templateUrl: './leads-overview.component.html',
  styleUrls: ['./leads-overview.component.scss']
})
export class LeadsOverviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  leadsList: any[] = [];
  leadsSummary: any[] = [];
  agentsList: any[] = [];

  // Leads Table Column Names
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
      key: "leadId",
      label: "Lead ID",
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
      key: "leadOwner",
      label: "Lead Owner",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "expectedRevenue",
      label: "Expected Revenue",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 7,
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
      leadId: '3455680',
      firstName: 'Gustavo',
      lastName: 'Calzoni',
      email: 'gustavocalzoni@gmail.com',
      industry: 'Agriculture',
      jobTitle: 'Sales Coordinator',
      leadOwner: 'Matthew Ruckford',
      expectedRevenue: '£ 4,000',
      phone: '+44765848840',
      status: 'won'
    },
    {
      id: 2,
      leadId: '2338743',
      firstName: 'Henry',
      lastName: 'Obaoio',
      email: 'henryobaio@gmail.com',
      industry: 'Technology',
      jobTitle: 'Chief Technical Officer',
      leadOwner: 'Matthew Ruckford',
      expectedRevenue: '£ 10,000',
      phone: '+44765848840',
      status: 'lost'
    },
    {
      id: 3,
      leadId: '1234455',
      firstName: 'Grace',
      lastName: 'Merrim',
      email: 'gracemerrim@gmail.com',
      industry: 'Politics',
      jobTitle: 'Zonal Leader',
      leadOwner: 'Sarah Merck',
      expectedRevenue: '£ 5,000',
      phone: '+44765848840',
      status: 'new'
    },
    {
      id: 4,
      leadId: '3487887',
      firstName: 'Walter',
      lastName: 'Percy',
      email: 'walterpercy@gmail.com',
      industry: 'Government',
      jobTitle: 'Civil Servant',
      leadOwner: 'Sarah Merck',
      expectedRevenue: '£ 10,000',
      phone: '+44765848840',
      status: 'qualified'
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

    this.leadsSummary = [
      {
        id: 1,
        salesType: "Total Leads",
        referenceDate: 'Last 30 days',
        salesValue: '234',
        icon: "bi bi-person-badge-fill",
        status: "primary"
      },
      {
        id: 2,
        salesType: "Leads Value",
        referenceDate: 'Last 30 days',
        salesValue: '$12k',
        icon: "bi bi-cash-stack",
        status: "pending"
      },
      {
        id: 3,
        salesType: "Total Won",
        referenceDate: 'Last 30 days',
        salesValue: '100',
        icon: "bi bi-person-fill-check",
        status: "active"
      },
      {
        id: 4,
        salesType: "Total Lost",
        referenceDate: 'Last 30 days',
        salesValue: '100',
        icon: "bi bi-person-fill-dash",
        status: "warning"
      }
    ]
  }

  getPageData = async () => {
    this.agentsList = await this.crmService.getAgents().toPromise();
    this.leadsList = await this.crmService.getLeads().toPromise();

    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.leadsList['data']);
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

  createNewLead() {
    const dialogRef = this.dialog.open(LeadsInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        isExisting: false,
        agentsList: this.agentsList['data'],
      },
    });
  }

  //Delete a lead
  deleteLead(info: any) {
    console.log(info);
    this.notifyService.confirmAction({
      title: 'Remove Lead',
      message: 'Are you sure you want to remove this lead?',
      confirmText: 'Remove Lead',
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
