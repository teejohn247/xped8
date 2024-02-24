import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { CreateKpiGroupComponent } from '../create-kpi-group/create-kpi-group.component';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { CreateKpiComponent } from '../create-kpi/create-kpi.component';
import { CreateAppraisalPeriodComponent } from '../create-appraisal-period/create-appraisal-period.component';
import { CreateRatingScaleComponent } from '../create-rating-scale/create-rating-scale.component';


@Component({
  selector: 'app-general-appraisal',
  templateUrl: './general-appraisal.component.html',
  styleUrls: ['./general-appraisal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralAppraisalComponent implements OnInit {

  loggedInUser: any;
  departmentList: any[] = [];
  appraisalPeriods: any[] = [];
  appraisalRequests: any[] = [];
  kpiGroups: any[] = [];
  sideModalOpened: boolean = false;

  appraisalKpis: any[] = [];
  periodInView: any;
  currentPeriodId: string;
  appraisalPeriodName: string;

  employees: any[] = [];
  matrixScore = [0, 1];
  matrixItems: any[] = [];

  ratingAccordionItems = [
    {
      name: "Excellent",
      description: "Highest quality of delivery and professionalism",
      ratingValue: 5
    },
    {
      name: "Very Good",
      description: "Great quality of delivery and professionalism",
      ratingValue: 4
    },
    {
      name: "Good",
      description: "Good quality of delivery and professionalism",
      ratingValue: 3
    },
    {
      name: "Average",
      description: "Average quality of delivery and professionalism",
      ratingValue: 2
    },
    {
      name: "Poor",
      description: "Poor quality of delivery and professionalism",
      ratingValue: 1
    }
  ]

  constructor(    
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.appraisalKpis = [
      {
        groupName: 'General',
        groupKpis: [
          {
            kpiName: 'Company Values',
            kpiDescription: 'How well do you keep the values of the company?'
          }
        ]
      },
      {
        groupName: 'Development',
        groupKpis: [
          {
            kpiName: 'Excellence',
            kpiDescription: 'How well do you pay attention to details?'
          },
          {
            kpiName: 'Technical Knowledge',
            kpiDescription: 'How well do you know about technical functionalities?'
          }
        ]
      },
      {
        groupName: 'Sales',
        groupKpis: [
          {
            kpiName: 'Return on investment',
            kpiDescription: 'How effective was your sales reach?'
          },
          {
            kpiName: 'Customer Conversion',
            kpiDescription: 'How many customers are you able to reach out to?'
          }
        ]
      }
    ]
  }

  ngOnInit(): void {
    // if(this.matrixScore = [0,1]) {
    //   this.matrixItems.find(x => {
    //     if(x.order == 4) x.staff.push({
    //       image: "profile-img.jpg"
    //     })
    //   })
    // }
    
    this.getPageData();
  }

  getPageData = async () => {
    this.loggedInUser = this.authService.loggedInUser.data;
    console.log(this.loggedInUser);
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.employees = await this.hrService.getEmployees().toPromise();
    this.ratingAccordionItems = await this.hrService.getKpiRatings().toPromise();
    this.kpiGroups = await this.hrService.getKpiGroups().toPromise();
    this.appraisalPeriods = await this.hrService.getAppraisalPeriods().toPromise();
    this.appraisalRequests = await this.hrService.getAppraisalRequests().toPromise();
    console.log(this.appraisalRequests);
    this.currentPeriodId = this.appraisalPeriods['data'][0]._id;
    // this.periodInView = this.appraisalPeriods['data'][0];
    this.loadPageData();
  }

  loadPageData= async () =>  {
    this.periodInView = await this.hrService.getAppraisalDetails(this.currentPeriodId).toPromise();
    this.periodInView = this.periodInView['data'];
    console.log(this.periodInView);

    this.generateMatrix(this.periodInView[0].appraisalData);
  }

  generateMatrix(info: any) {
    console.log(info);
    // info.forEach(x => {
    //   console.log(x);
    //   x.matrixScore = [0, 1];
    // })
    this.matrixItems = [
      {
        id: 3,
        label: "Star",
        order: 3,
        staff: []
      },
      {
        id: 2,
        label: "High Potential",
        order: 2,
        staff: []
      },
      {
        id: 1,
        label: "Potential Gem",
        order: 1,
        staff: []
      },
      {
        id: 6,
        label: "High Performer",
        order: 6,
        staff: []
      },
      {
        id: 5,
        label: "Core Player",
        order: 5,
        staff: []
      },
      {
        id: 4,
        label: "Inconsistent Player",
        order: 4,
        staff: []
      },
      {
        id: 9,
        label: "Solid Performer",
        order: 9,
        staff: []
      },
      {
        id: 8,
        label: "Average Performer",
        order: 8,
        staff: []
      },
      {
        id: 7,
        label: "Risk",
        order: 7,
        staff: []
      }
    ]

    this.matrixItems.sort((a,b) => (a.order - b.order));

    info.map(detail => {
      if(detail.matrixScore[0] == 0 && detail.matrixScore[1] == 2) {
        this.matrixItems.find(x => {
          if(x.order == 1) {
            x.staff.push(detail);
            alert('yeah')
          };
          // if(x.order == 1) ;

        })
      }
      else if(detail.matrixScore[0] == 1 && detail.matrixScore[1] == 2) {
        this.matrixItems.find(x => {
          if(x.order == 2) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 2 && detail.matrixScore[1] == 2) {
        this.matrixItems.find(x => {
          if(x.order == 3) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 0 && detail.matrixScore[1] == 1) {
        this.matrixItems.find(x => {
          if(x.order == 4) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 1 && detail.matrixScore[1] == 1) {
        this.matrixItems.find(x => {
          if(x.order == 5) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 2 && detail.matrixScore[1] == 1) {
        this.matrixItems.find(x => {
          if(x.order == 6) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 0 && detail.matrixScore[1] == 0) {
        this.matrixItems.find(x => {
          if(x.order == 7) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 0 && detail.matrixScore[1] == 1) {
        this.matrixItems.find(x => {
          if(x.order == 8) x.staff.push(detail);
        })
      }
      else if(detail.matrixScore[0] == 0 && detail.matrixScore[1] == 2) {
        this.matrixItems.find(x => {
          if(x.order == 9) x.staff.push(detail);
        })
      }


      // switch(detail.matrixScore) {
      //   case [0, 2]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 1) x.staff.push(detail);
      //     })
      //     break;
      //   case [1, 2]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 2) x.staff.push(detail);
      //     })
      //     break;
      //   case [2, 2]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 3) x.staff.push(detail);
      //     })
      //     break;
      //   case detail.matrixScore.length === 2 && detail.matrixScore[0] === 0 && detail.matrixScore[1] === 1:
      //     // alert('Here');
      //     // this.matrixItems.find(x => {
      //     //   if(x.order == 4) x.staff.push(detail);
      //     // })
      //     break;
      //   case [1, 1]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 5) x.staff.push(detail);
      //     })
      //     break;
      //   case [2, 1]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 6) x.staff.push(detail);
      //     })
      //     break;
      //   case [0, 0]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 7) x.staff.push(detail);
      //     })
      //     break;
      //   case [0, 1]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 8) x.staff.push(detail);
      //     })
      //     break;
      //   case [0, 2]:
      //     this.matrixItems.find(x => {
      //       if(x.order == 9) x.staff.push(detail);
      //     })
      //     break;
      //   default:
      //     break;
      // }
      // if(detail.matrixScore = [0,1]) {
      //   this.matrixItems.find(x => {
      //     if(x.order == 4) x.staff.push(detail);
      //   })
      // }
    })

  }

  convertToNum(val) {
    return Number(val);
  }

  viewAppraisalInfo(info: any) {
    if(info.status == 'Pending') {
      this.notifyService.showInfo('This employee has not yet filled in their appraisal request.')
    }
    else {
      this.router.navigateByUrl(`dashboard/human-resources/appraisals/${info.employeeId}`);
    }
  }

  /* KPI Group Functions */

  // Create a KPI Group
  addKpiGroup() {
    this.dialog.open(CreateKpiGroupComponent, {
      width: '30%',
      height: 'auto',
      data: {
        departments: this.departmentList['data'],
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  // Update a KPI Rating
  updateKpiGroup(details) {
    this.dialog.open(CreateKpiGroupComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: true,
        departments: this.departmentList['data'],
        modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  //Delete a KPI Rating
  deleteKpiGroup(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.groupName + ' KPI Group',
      message: 'Are you sure you want to remove this kpi group?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteKpiGroup(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('This KPI rating has been deleted successfully');
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

  /* KPI Functions */

  // Create a KPI
  addKpi(groupId: string) {
    this.dialog.open(CreateKpiComponent, {
      width: '30%',
      height: 'auto',
      data: {
        groupId: groupId,
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  // Update a KPI
  updateKpi(details) {
    this.dialog.open(CreateKpiComponent, {
      width: '30%',
      height: 'auto',
      data: {
        groupId: details.kpiGroupId,
        isExisting: true,
        modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  //Delete a KPI Rating
  deleteKpi(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.kpiName + ' KPI',
      message: 'Are you sure you want to remove this kpi?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteKpi(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('This KPI has been deleted successfully');
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


  /* Appraisal Period Functions */

  //Create an Appraisal Period
  addAppraisalPeriod() {
    this.dialog.open(CreateAppraisalPeriodComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  //Edit an Appraisal Period
  openEditModal() {
    this.dialog.open(CreateAppraisalPeriodComponent, {
      width: '30%',
      height: 'auto',
      data: {
        name: this.periodInView[0].appraisalPeriodName,
        id: this.periodInView[0]._id,
        isExisting: true,
        modalInfo: this.periodInView[0]
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });;
  }

  //Delete a Appraisal Period
  deleteAppraisalPeriod(info?: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.appraisalPeriodName + ' Period',
      message: 'Are you sure you want to remove this period?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteAppraisalPeriod(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('This Appraisal period has been deleted successfully');
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

  /* KPI Rating Functions*/

  // Create a KPI Rating
  addRating() {
    this.dialog.open(CreateRatingScaleComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  // Update a KPI Rating
  updateKpiRating(details) {
    this.dialog.open(CreateRatingScaleComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: true,
        modalInfo: details
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  //Delete a KPI Rating
  deleteKpiRating(info: any) {
    this.notifyService.confirmAction({
      title: 'Remove ' + info.ratingName + ' Rating',
      message: 'Are you sure you want to remove this kpi rating?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.hrService.deleteKpiRating(info._id).subscribe({
          next: res => {
            // console.log(res);
            if(res.status == 200) {
              this.notifyService.showInfo('This KPI rating has been deleted successfully');
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


  setAppraisalData(details) {
    console.log(details);
    this.currentPeriodId = details._id;
    this.loadPageData();
  }

}
