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
import { AgentInfoComponent } from '../agent-info/agent-info.component';

@Component({
  selector: 'app-agents-overview',
  templateUrl: './agents-overview.component.html',
  styleUrls: ['./agents-overview.component.scss']
})
export class AgentsOverviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  contactsList: any[] = [];
  departmentList: any[] = [];
  designationList: any[] = [];
  agentsList: any[] = [];


  //Agents Table Column Names
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
    // {
    //   key: "agentId",
    //   label: "Agent ID",
    //   order: 3,
    //   columnWidth: "8%",
    //   cellStyle: "width: 100%",
    //   sortable: true
    // },
    {
      key: "name",
      label: "Name",
      order: 4,
      columnWidth: "14%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "rating",
      label: "Rating",
      order: 5,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "contacts",
      label: "Total Contacts",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "leads",
      label: "Total Leads",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "tickets",
      label: "Total Tickets",
      order: 8,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "tickets",
      label: "Resolved Tickets",
      order: 9,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 10,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  tableData: any[] = [
    {
      id: 1,
      agentId: '3455680',
      firstName: 'Gustavo',
      lastName: 'Calzoni',
      email: 'gustavocalzoni@gmail.com',
      totalContacts: '30',
      totalLeads: '25',
      totalTickets: '40',
      resolvedTickets: '10',
      rating: 3
    },
    {
      id: 2,
      agentId: '234555',
      firstName: 'Greg',
      lastName: 'Thompson',
      email: 'gregthompson@gmail.com',
      totalContacts: '23',
      totalLeads: '10',
      totalTickets: '25',
      resolvedTickets: '11',
      rating: 5
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
  }

  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.designationList = await this.hrService.getDesignations().toPromise();
    this.agentsList = await this.crmService.getAgents().toPromise();

    // console.log(this.agentsList);
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.agentsList['data']);
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

  viewDetails(agentInfo: any) {
    console.log(agentInfo);
    this.editAgent();
  }

  addNewAgent() {
    let dialogRef = this.dialog.open(AgentInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        departmentList: this.departmentList['data'],
        designationList: this.designationList['data'],
        isExisting: false
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPageData();
    }); 
  }

  editAgent() {
    let dialogRef = this.dialog.open(AgentInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        departmentList: this.departmentList['data'],
        designationList: this.designationList['data'],
        isExisting: true
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPageData();
    }); 
  }

  //Delete an agent
  deleteAgent(info: any) {
    console.log(info);
    this.notifyService.confirmAction({
      title: 'Remove Agent',
      message: 'Are you sure you want to remove this employee as an agent?',
      confirmText: 'Remove Agent',
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
