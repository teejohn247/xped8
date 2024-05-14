import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { PayrollSummary } from 'src/app/shared/models/payroll-data';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { SharedService } from 'src/app/shared/services/utils/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedIndex = 0;
  slideInterval = 5000;

  dashboardSummary: any[] = [];
  departmentList: any[] = [];
  employeeList: any[] = [];
  payrollPeriods: any[] = [];
  userDetails: any;

  attendanceList: any[] = [];

  carouselItems = [
    {
      label: "HR",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/it-was-late-night-totally-worth-it-shot-group-young-businesspeople-looking-excited-while-using-laptop-during-late-night-work-scaled.jpg",
      caption: "Welcome to Silo HRM System"
    },
    {
      label: "Project Management",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/flat-lay-people-working-office-scaled.jpg",
      caption: "Empowering Project Management Excellence"
    },
    {
      label: "Supply Chain",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/hand-with-support-gears-isolated-white-background-1-scaled.jpg",
      caption: "Optimizing Your Supply Chain Management Processes"
    },
    {
      label: "CRM",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/cheerful-call-center-operators-during-working-process-1-scaled.jpg",
      caption: "Streamline Customer Relationship with Our CRM Module"
    }
  ]

  constructor(
    public dialog: MatDialog,
    private route: Router,
    private datePipe: DatePipe,
    private authService: AuthenticationService,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.authService.loggedInUser.data;
    console.log(this.userDetails);
    this.getPageData();
    if(!this.userDetails.isSuperAdmin) {
      this.sharedService.getCurrentLocation().subscribe(pos=> {
        console.log(pos);
        let checkInTime = new Date();
        let userPos:[number, number] = [pos.latitude, pos.longitude];
        let distanceFromOffice = this.checkLocation(userPos);
        if(distanceFromOffice > 2) {
          this.notifyService.confirmAction({
            title: 'Location Details',
            message: `You are currently at this position: ${pos.latitude} and ${pos.longitude}. You are currently ${distanceFromOffice}km away from the office. Do you want to check in manually?`,
            confirmText: 'Manual Checkin',
            cancelText: 'Cancel',
          }).subscribe((confirmed) => {
            if (confirmed) {
              this.manualCheckAction('checkIn');
            }
          });
        }
        else {
          this.manualCheckAction('checkIn');
        }
      });
    }
    
  }

  checkLocation(userPos) {
    const officePos: [number, number] = [6.595643351234309, 3.3544838956325185];
    // [6.595643351234309, 3.3544838956325185]
    // [6.4293011410936725, 3.4184931377760366]
    return this.sharedService._getDistanceFromLatLonInKm(officePos, userPos);
  }

  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.employeeList = await this.hrService.getEmployees().toPromise();
    this.payrollPeriods = await this.hrService.getPayrollPeriods().toPromise();
    this.attendanceList = await this.hrService.getAttendanceList().toPromise();
    console.log(this.attendanceList);

    this.dashboardSummary = [
      {
        id: 1,
        value: this.employeeList['data'].length,
        percentChange: "5%",
        name: "Employees",
        colorDark: "rgb(54,171,104)",
        colorLight: "rgba(54,171,104,0.2)",
        icon: "bi bi-arrow-up-right",
        symbol: "bi bi-people-fill"
      },
      {
        id: 2,
        value: this.departmentList['data'].length,
        percentChange: "",
        name: "Departments",
        colorDark: "rgb(235, 87, 87)",
        colorLight: "rgba(235, 87, 87, 0.2)",
        icon: "bi bi-arrow-down-right",
        symbol: "bi bi-pie-chart-fill"
      },
      {
        id: 3,
        value: `£ ${this.payrollPeriods['data'][0].netEarnings}`,
        percentChange: "14%",
        name: "Net Salary",
        colorDark: "rgb(235, 87, 87)",
        colorLight: "rgba(235, 87, 87, 0.2)",
        icon: "bi bi-arrow-down-right",
        symbol: "bi bi-layers-half"
      }
    ]
  }

  AreaHighcharts: typeof Highcharts = Highcharts;
  areaChartOptions: Highcharts.Options = {
    title: {
      text: ""
    },
    credits: {
      enabled: false
    },
    xAxis:{
      categories:["Jan", "Feb", "Mar", "Apr"],
      //labels: {enabled:false}
    },
    yAxis: {          
      title:{
        text:""
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
        name: 'Gross Pay',
        data: [10.2, 13.7, 16.5, 17.9],
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

  //CAROUSEL SLIDE FUNCTIONS
  selectSlide(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.carouselItems.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if(this.selectedIndex === this.carouselItems.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval)
  }

  manualCheckAction(action: string) {
    let data = {
      checkInTime: new Date(),
    }
    this.hrService.staffCheckInOut(data).subscribe({
      next: res => {
        // console.log(res);
        if(res.status == 200) {
          if(action == 'checkIn') {
            this.notifyService.showSuccess('You have been checked in successfully');
          }
          else {
            this.notifyService.showSuccess('You have been checked out successfully');
          }
        }
        // this.getPageData();
      },
      error: err => {
        console.log(err)
        this.notifyService.showError(err.error.error);
      } 
    })
  }

}
