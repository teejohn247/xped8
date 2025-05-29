import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeData, EmployeeTable } from 'src/app/shared/models/employee-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { CreateSingleInfoComponent } from 'src/app/shared/components/create-single-info/create-single-info.component';
import { BulkUploadComponent } from '../bulk-upload/bulk-upload.component';
import { AssignManagerApproversComponent } from '../assign-manager-approvers/assign-manager-approvers.component';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesListComponent implements OnInit {

  pageSize:number;
  filterCriteria:string;
  filterValue:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[];
  dataSource: MatTableDataSource<EmployeeData>;
  selection = new SelectionModel<EmployeeData>(true, []);

  employeeList: any[];
  departmentList: any[] = [];
  designationList: any[] = [];
  isLoadingRow = (index: number, row: any) => row?.isLoading === true;

  //Employee Table Column Names
  tableColumns: EmployeeTable[] = [
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
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "email",
      label: "Email Address",
      order: 6,
      columnWidth: "14%",
      cellStyle: "width: 100%",
      sortable: true
    },
    // {
    //   key: "phoneNumber",
    //   label: "Phone Number",
    //   order: 7,
    //   columnWidth: "12%",
    //   cellStyle: "width: 100%",
    //   sortable: true
    // },
    // {
    //   key: "dateOfBirth",
    //   label: "Date of Birth",
    //   order: 8,
    //   columnWidth: "8%",
    //   cellStyle: "width: 100%",
    //   sortable: true
    // },
    {
      key: "department",
      label: "Department",
      order: 8,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "companyRole",
      label: "Role",
      order: 9,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "activeStatus",
      label: "Status",
      order: 10,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 11,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  employeeData : any = [];
  public search$ = new BehaviorSubject<string>('');
  public filter$ = new BehaviorSubject<string>('');
  public page$ = new BehaviorSubject<number>(1);
  public size$ = new BehaviorSubject<number>(10);

  totalItems = 0;
  apiLoading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.getPageData();
  }

  ngOnInit(): void {
    //console.log(this.employeeList);
    this.displayedColumns = this.tableColumns.map(column => column.label);
    //console.log(this.employeeList);    
  }

  ngAfterViewInit() {

    const search$ = this.search$.pipe(startWith(''), debounceTime(300), distinctUntilChanged());
    const filter$ = this.filter$.pipe(startWith(''));
    const page$ = this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 10 }));

    this.size$.subscribe(val => this.pageSize = val)
    this.filter$.subscribe(val => this.filterValue = val)

    combineLatest([search$, filter$, page$]).pipe(
      filter(([search, filter, page]) => search !== undefined && filter !== undefined && page !== undefined),
      tap(() => {
        this.apiLoading = true;
      }),
      switchMap(([search, filter, page]) => {
        console.log(search, filter, page)
        return this.hrService.getEmployees(page.pageIndex + 1, page.pageSize, search, filter).pipe(
          catchError(() => of({ items: [], total: 0 })), // Fallback on error
          tap(() => {
            this.apiLoading = false;
          })
        )
      })
    ).subscribe((res: any) => {
      //console.log(res)
      this.totalItems = res.totalItems;
      this.employeeList = res.data;
      //console.log(res);
      this.dataSource = new MatTableDataSource(this.employeeList);
      this.dataSource.sort = this.sort;
    });
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

  addNewEmployee() {
    let dialogRef = this.dialog.open(CreateSingleInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        departmentList: this.departmentList,
        designationList: this.designationList,
        isExisting: false
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPageData();
    }); 
  }

  addBulkEmployees() {
    let dialogRef = this.dialog.open(BulkUploadComponent, {
      width: '35%',
      height: 'auto',
      data: {
        departmentList: this.departmentList,
        designationList: this.designationList,
        isExisting: false
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPageData();
    }); 
  }

  //Delete an employee
  deleteEmployee(info: any) {
    console.log(info);
    this.notifyService.confirmAction({
      title: 'Remove Employee',
      message: 'Are you sure you want to remove this employee?',
      confirmText: 'Remove Employee',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteEmployee(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('The employee has been deleted successfully');
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

  viewEmployee(info: any) {
    this.router.navigateByUrl(`dashboard/human-resources/employees/${info._id}`);
  }

  getPageData = async () => {
    const departments$ = this.hrService.getDepartments().subscribe(res => this.departmentList = res.data)
    const designations$ = this.hrService.getDesignations().subscribe(res => this.designationList = res.data)
  }

  assignManager(assignType: string, count: string, row?: any) {
    if(row) this.selection.select(row);
    console.log(this.selection.selected);
    let dialogRef = this.dialog.open(AssignManagerApproversComponent, {
      width: '25%',
      height: 'auto',
      data: {
        assignmentType: assignType,
        employeeList: this.employeeList,
        selections: this.selection['selected'],
        isExisting: false
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.selection.clear()
      this.getPageData();
    }); 
  }

  updateSearch(term: string) {
    this.search$.next(term);
  }

  updateFilter(term: string) {
    this.filter$.next(term);
  }

  updateSize(size: number) {
    this.size$.next(size);
  }

  setFilterCriteria(criteria:string) {
    !this.filterCriteria || this.filterCriteria != criteria ? this.filterCriteria = criteria : this.filterCriteria = '';
    if(!this.filterCriteria) this.updateFilter('')
  }

}
