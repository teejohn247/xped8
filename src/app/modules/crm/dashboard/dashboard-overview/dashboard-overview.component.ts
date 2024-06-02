import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router } from "@angular/router";
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { SharedService } from 'src/app/shared/services/utils/shared.service';


@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

  crmSummary: any[] = [];
  supportTickets: any[] = [];

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  AreaHighcharts: typeof Highcharts = Highcharts;
  areaChartOptions: Highcharts.Options = {
    title: {
      text: "Sales Revenue"
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
        name: 'Revenue',
        data: [7.9, 10.2, 13.7, 16.5, 17.9, 15.2, 17.0, 20.6, 22.2, 26.3, 29.6, 27.8],
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

  //Tickets Summary Table Column Names
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
    private route: Router,
    private datePipe: DatePipe,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.getPageData();
  }

  ngOnInit(): void {
  }

  getPageData = async () => {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);

    this.crmSummary = [
      {
        id: 1,
        value: '250',
        percentChange: "5%",
        name: "Active Contacts",
        refLabel: 'Contact',
        colorDark: "rgb(54,171,104)",
        colorLight: "rgba(54,171,104,0.2)",
        icon: "bi bi-arrow-up-right",
        symbol: "bi bi-people-fill",
        status: 'active'
      },
      {
        id: 2,
        value: '40',
        percentChange: "21%",
        name: "New Leads",
        refLabel: 'Lead',
        colorDark: "rgb(235, 87, 87)",
        colorLight: "rgba(235, 87, 87, 0.2)",
        icon: "bi bi-arrow-down-right",
        symbol: "bi bi-person-fill-add",
        status: 'pending'
      },
      {
        id: 3,
        value: '15',
        percentChange: "14%",
        name: "Open Tickets",
        refLabel: 'Ticket',
        colorDark: "rgb(235, 87, 87)",
        colorLight: "rgba(235, 87, 87, 0.2)",
        icon: "bi bi-arrow-down-right",
        symbol: "bi bi-ticket-detailed-fill",
        status: 'warning'
      }
    ]
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
