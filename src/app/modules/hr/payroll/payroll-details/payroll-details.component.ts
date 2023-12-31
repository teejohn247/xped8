import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, Location } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { PayrollPeriodDetailsComponent } from '../payroll-period-details/payroll-period-details.component';

@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.component.html',
  styleUrls: ['./payroll-details.component.scss']
})
export class PayrollDetailsComponent implements OnInit {

  tableColumns: TableColumn[];
  tableData: any[] = [];
  columnsCount: number = 3;

  payrollPeriods: any[] = [];
  payrollCreditList: any[] = [];
  payrollDebitList:any[] = [];
  employees: any[] = [];

  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.getPageData();
  }

  ngOnInit(): void {
    this.openPayrollModal();
  }

  goBack() {
    this.location.back();
  }

  getPageData = async () => {
    this.payrollPeriods = await this.hrService.getPayrollPeriods().toPromise();
    console.log(this.payrollPeriods);
    this.payrollCreditList = await this.hrService.getPayrollCredits().toPromise();
    this.payrollDebitList = await this.hrService.getPayrollDebits().toPromise();
    this.employees = await this.hrService.getEmployees().toPromise();

    console.log(this.payrollCreditList);
    console.log(this.payrollDebitList);
    console.log(this.employees);
  }

  //Convert string to camel case
  toCamelCase(str:string){
    return str.split(' ').map(function(word,index){
      // If it is the first word make sure to lowercase all the chars.
      if(index == 0){
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
  }

  generateTableColumns() {
    this.tableColumns = [
      {
        key: "select",
        label: "Select",
        order: 1,
        columnWidth: "3%",
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
        key: "name",
        label: "Name",
        order: 3,
        columnWidth: "12%",
        cellStyle: "width: 100%",
        sortable: true
      },
    ];

    if(this.payrollCreditList) {
      this.payrollCreditList['data'].map( item => {
        this.columnsCount = this.columnsCount + 1;
        let columnObject = {
          key: this.toCamelCase(item.name),
          label: item.name,
          order: this.columnsCount,
          // columnWidth: 'auto',
          columnWidth: String((100-45)/(this.payrollCreditList['data'].length + this.payrollDebitList['data'].length)) + '%',
          cellStyle: "green",
          sortable: false
        }
        this.tableColumns.push(columnObject);
      })
    }
    
    if(this.payrollDebitList) {
      this.payrollDebitList['data'].map( item => {
        this.columnsCount = this.columnsCount + 1;
        let columnObject = {
          key: this.toCamelCase(item.name),
          label: item.name,
          order: this.columnsCount,
          // columnWidth: 'auto',
          columnWidth: String((100-45)/(this.payrollCreditList['data'].length + this.payrollDebitList['data'].length)) + '%',
          cellStyle: "red",
          sortable: false
        }
        this.tableColumns.push(columnObject);
      });

      let otherColumns = ['Net Earnings', 'Status', 'Actions'];
      otherColumns.map(item => {
        this.columnsCount = this.columnsCount + 1;
        let columnObject = {
          key: this.toCamelCase(item),
          label: item,
          order: this.columnsCount,
          columnWidth: item == 'Net Earnings' ? '10%' : '8%',
          cellStyle: "width: 100%",
          sortable: false
        }
        this.tableColumns.push(columnObject);
      })
    }
    console.log(this.tableColumns);
  }

  generateTableData() {
    this.employees['data'].map(item => {
      let dataEntry= {};
      dataEntry['name'] = item.fullName;
      dataEntry['companyRole'] = item.companyRole;
      dataEntry['department'] = item.department;
      dataEntry['designationName'] = item.designationName;
      dataEntry['email'] = item.email;
      dataEntry['employmentType'] = item.employmentType;
      dataEntry['image'] = item.profilePic;
      dataEntry['status'] = 'Pending';

      this.tableColumns.map(columnName => {
        if(!(columnName.key == 'select' || columnName.key == 'image' || columnName.key == 'name' || columnName.key == 'status' || columnName.key == 'actions')) {
          dataEntry[columnName.key] = 8000;
        }
      })

      this.tableData.push(dataEntry);
    });

    console.log(this.tableData);
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


  /*************** PAYROLL PERIOD RELATED ACTIONS ***************/

  //Open payroll period modal
  openPayrollModal() {
    this.dialog.open(PayrollPeriodDetailsComponent, {
      width: '30%',
      height: 'auto',
      data: {
        // name: details.name,
        // id: details._id,
        isExisting: false,
        disableClose: true,
        // modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.generateTableColumns();
      this.generateTableData();

      if(this.tableColumns) {
        this.tableColumns.sort((a,b) => (a.order - b.order));
        this.displayedColumns = this.tableColumns.map(column => column.label);
        this.dataSource = new MatTableDataSource(this.tableData);
      }
    });
  }

  //Edit a Payroll Period
  openEditModal(details: any) {
    this.dialog.open(PayrollPeriodDetailsComponent, {
      width: '32%',
      height: 'auto',
      data: {
        name: details.designationName,
        id: details._id,
        // leaveTypes: this.leaveTypeList['data'],
        isExisting: true,
        modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });;
  }

  //Delete a Payroll Period
  deletePayrollPeriod(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.name + ' Designation',
      message: 'Are you sure you want to remove this payroll period?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deletePayrollPeriod(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('The designation has been deleted successfully');
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
