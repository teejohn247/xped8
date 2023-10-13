import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { DesignationInfoComponent } from '../designation-info/designation-info.component';
import { LeaveTypeInfoComponent } from '../leave-type-info/leave-type-info.component';
import { DepartmentInfoComponent } from '../department-info/department-info.component';

@Component({
  selector: 'app-human-resources-settings',
  templateUrl: './human-resources-settings.component.html',
  styleUrls: ['./human-resources-settings.component.scss']
})
export class HumanResourcesSettingsComponent implements OnInit {

  panelOpenState = false;
  accordionItems: any[] = [];

  departmentList: any[] = [];
  companyRoles: any[] = [];
  designationList: any[] = [];
  leaveTypeList: any[] = [];
  employees: any[] = [];

  hrSettingsForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.hrSettingsForm = this.fb.group({
      department: [''],
      designation: [''],
      companyRole: [''],
      leaveType: ['']
    })
  }

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.employees = await this.hrService.getEmployees().toPromise();
    this.designationList = await this.hrService.getDesignations().toPromise();
    this.leaveTypeList = await this.hrService.getLeaveTypes().toPromise();
    this.accordionItems = [
      {
        label: "Departments",
        key: "departments",
        list: this.departmentList['data']
      },
      {
        label: "Designations",
        key: "designations",
        list: this.designationList['data']
      },
      // {
      //   label: "Company Roles",
      //   key: "companyRoles",
      //   list: this.companyRoles['data']
      // },
      {
        label: "Leave Types",
        key: "leaveTypes",
        list: this.leaveTypeList['data']
      }
    ]

    console.log(this.departmentList);
    console.log(this.designationList);
    console.log(this.leaveTypeList);
  }

  /*************** DEPARTMENT RELATED ACTIONS ***************/
  
  //Create a new department
  createDepartment() {
    let data = {
      departmentName: this.hrSettingsForm.value.department ? this.hrSettingsForm.value.department : ""
    }
    if(this.hrSettingsForm.value.department) {
      this.hrService.createDepartment(data).subscribe({
        next: res => {
          // console.log(res);
          if(res.status == 200) {
            this.dialog.open(DepartmentInfoComponent, {
              width: '30%',
              height: 'auto',
              data: {
                name: data.departmentName,
                id: res.data._id,
                isExisting: false,
                staff: this.employees['data']
              },
            }).afterClosed().subscribe(() => {
              this.hrSettingsForm.reset();
              this.getPageData();
            });
            // this.notifyService.showSuccess('This designation has been created successfully');
          }
        },
        error: err => {
          console.log(err)
          this.notifyService.showError(err.error.error);
        } 
      })
    }
    else {
      this.dialog.open(DepartmentInfoComponent, {
        width: '30%',
        height: 'auto',
        data: {
          name: data.departmentName,
          isExisting: false,
          staff: this.employees['data']
        },
      }).afterClosed().subscribe(() => {
        this.getPageData();
      });
    }
  }

  //Edit a department
  editDepartment(details: any) {
    this.dialog.open(DepartmentInfoComponent, {
      width: '30%',
      height: 'auto',
      data: {
        name: details.departmentName,
        id: details._id,
        isExisting: true,
        modalInfo: details,
        staff: this.employees['data']
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  //Delete a department
  deleteDept(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.departmentName + ' Department',
      message: 'Are you sure you want to remove this department?',
      confirmText: 'Remove Department',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteDepartment(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('The department has been deleted successfully');
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

  /*************** DESIGNATION RELATED ACTIONS ***************/

  //Create a new designation
  createDesignation() {
    let data = {
      "designationName": this.hrSettingsForm.value.designation ? this.hrSettingsForm.value.designation : ""
    }
    if(this.hrSettingsForm.value.designation) {
      this.hrService.createDesignation(data).subscribe({
        next: res => {
          console.log(res);
          if(res.status == 200) {
            this.dialog.open(DesignationInfoComponent, {
              width: '32%',
              height: 'auto',
              data: {
                name: data.designationName,
                id: res.data._id,
                leaveTypes: this.leaveTypeList['data'],
                isExisting: false
              },
            }).afterClosed().subscribe(() => {
              this.hrSettingsForm.reset();
              this.getPageData();
            });
            // this.notifyService.showSuccess('This designation has been created successfully');
          }
        },
        error: err => {
          console.log(err)
          this.notifyService.showError(err.error.error);
        } 
      })
    }
    else {
      this.dialog.open(DesignationInfoComponent, {
        width: '32%',
        height: 'auto',
        data: {
          name: data.designationName,
          leaveTypes: this.leaveTypeList['data'],
          isExisting: false
        },
      }).afterClosed().subscribe(() => {
        this.getPageData();
      });
    }
    
    // console.log(data);
    // this.hrService.createDesignation(data).subscribe(res => {
    //   if(res.status == 200) {
    //     location.reload();
    //   }
    // })
  }

  //Edit a designation
  editDesignation(details: any) {
    this.dialog.open(DesignationInfoComponent, {
      width: '32%',
      height: 'auto',
      data: {
        name: details.designationName,
        id: details._id,
        leaveTypes: this.leaveTypeList['data'],
        isExisting: true,
        modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });;
  }

  //Delete a designation
  deleteDesignation(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.designationName + ' Designation',
      message: 'Are you sure you want to remove this designation?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteDesignation(info._id).subscribe({
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

  /*************** LEAVE TYPES RELATED ACTIONS ***************/

  //Create a new leave type
  createLeaveType() {
    let data = {
      leaveName: this.hrSettingsForm.value.leaveType ? this.hrSettingsForm.value.leaveType : ""
    }
    if(this.hrSettingsForm.value.leaveType) {
      this.hrService.createLeaveType(data).subscribe({
        next: res => {
          console.log(res);
          if(res.status == 200) {
            this.getPageData();
            // this.notifyService.showSuccess('This leave type has been created successfully');
            this.dialog.open(LeaveTypeInfoComponent, {
              width: '30%',
              height: 'auto',
              data: {
                name: data.leaveName,
                isExisting: false
              },
            }).afterClosed().subscribe(() => {
              this.getPageData();
            });
          }
        },
        error: err => {
          console.log(err)
          this.notifyService.showError(err.error.error);
        } 
      })
    }
    else {
      this.dialog.open(LeaveTypeInfoComponent, {
        width: '30%',
        height: 'auto',
        data: {
          name: data.leaveName,
          isExisting: false
        },
      }).afterClosed().subscribe(() => {
        this.getPageData();
      });
    }
    
    // console.log(data);
    // this.hrService.createDesignation(data).subscribe(res => {
    //   if(res.status == 200) {
    //     location.reload();
    //   }
    // })
  }

  //Edit a leave type
  editLeaveType(details: any) {
    this.dialog.open(LeaveTypeInfoComponent, {
      width: '30%',
      height: 'auto',
      data: {
        name: details.leaveName,
        id: details._id,
        isExisting: true,
        modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });;
  }

  //Delete a leave type
  deleteLeaveType(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.leaveName + ' Leave Type',
      message: 'Are you sure you want to remove this leave type?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteLeaveType(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('The leave type has been deleted successfully');
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
