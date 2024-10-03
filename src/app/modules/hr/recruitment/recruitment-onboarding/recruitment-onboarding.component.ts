import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-recruitment-onboarding',
  templateUrl: './recruitment-onboarding.component.html',
  styleUrls: ['./recruitment-onboarding.component.scss']
})
export class RecruitmentOnboardingComponent implements OnInit {

  employees: any[] = [];

  employeeInView: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  //Employee Table Column Names
  tableColumns: any[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "3%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "activity",
      label: "Activity Description",
      order: 2,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "responsibility",
      label: "Responsibility",
      order: 6,
      columnWidth: "14%",
      cellStyle: "width: 100%",
      sortable: true
    },

  ]

  tableRows = [
    {
      id: 1,
      activity: 'Offer letter created',
      responsibility: 'Human Resources Manager'
    },
    {
      id: 2,
      activity: 'Offer letter signed',
      responsibility: 'AApplicant'
    }
  ]

  constructor(
    private datePipe: DatePipe,
    private authService: AuthenticationService,
    private hrService: HumanResourcesService,  
  ) { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.getPageData();
  }

  getPageData = async () => {
    this.employees = await this.hrService.getEmployees().toPromise();
    this.employeeInView = this.employees['data'][0];
    this.dataSource = new MatTableDataSource(this.tableRows);
  }

  viewApplicantChecklist(applicantInfo) {
    console.log(applicantInfo);
    this.employeeInView = applicantInfo;
  }

  strToDate(dateVal: string, key:string) {
    // console.log(dateVal);
    if(key == 'startDate' || key == 'endDate') {
      let newFormat = new Date(dateVal);
      return this.datePipe.transform(newFormat, 'd MMMM, y')
    }
    else {
      const [day, month, year] = dateVal.split('-');
      let newFormat = new Date(+year, +month - 1, +day);
      // console.log(newFormat.toDateString());
      return this.datePipe.transform(newFormat, 'd MMMM, y')
    }    
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
