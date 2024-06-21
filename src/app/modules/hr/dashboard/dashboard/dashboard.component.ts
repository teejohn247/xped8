import { Component, OnInit } from '@angular/core';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
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

  userDetails: any;
  currency: string;
  dateTime: Date;
  employeeList: any[];
  departmentList: any[];
  payrollPeriods: any[] = [];
  cardsSummary: any[] = [];
  expenseData: any[];
  
  AreaHighcharts: typeof Highcharts = Highcharts;
  areaChartOptions: Highcharts.Options = {
    title: {
      text: ""
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
        name: 'Revenue',
        showInLegend: false,
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

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#90EE90', '#FA8072', '#9370DB', '#FF7F50']
  };
  colorScheme2 = {
    domain: ['#9370DB']
  };

  constructor(
    private authService: AuthenticationService,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private sharedService: SharedService,
  ) {
    setInterval(() => {
      this.dateTime = new Date()
    }, 1000)

    this.userDetails = this.authService.loggedInUser.data;
    this.currency = this.authService.currency ? this.authService.currency : '';

    this.userDetails.isSuperAdmin ? this.getPageData() : '';
  }

  ngOnInit(): void {
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
    console.log(this.userDetails);
  }


  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.employeeList = await this.hrService.getEmployees().toPromise();
    this.payrollPeriods = await this.hrService.getPayrollPeriods().toPromise();
    console.log(this.departmentList);

    // this.hrService.getEmployees().subscribe(res => {
    //   if(res) {
    //     this.employeeList = res.data;
    //   }
    // })

    // this.hrService.getDepartments().subscribe(res => {
    //   if(res) {
    //     this.departmentList = res.data;
        
    //   }
    // })

    this.cardsSummary = [
      {
        id: 1,
        count: this.employeeList['data'] ? this.employeeList['data'].length : 0,
        name: "Employees",
        colorDark: "rgba(29, 161, 242, 1)",
        colorLight: "rgba(66, 133, 244, 0.2)",
        icon: "bi bi-people-fill"
      },          
      {
        id: 2,
        count: this.departmentList['data'] ? this.departmentList['data'].length : 0,
        name: "Departments",
        colorDark: "rgba(54, 171, 104, 1)",
        colorLight: "rgba(66, 133, 244, 0.2)",
        icon: "bi bi-award-fill"
      },
      {
        id: 3,
        count: `${this.currency} ${this.payrollPeriods['data'] ? this.payrollPeriods['data'][0].netEarnings.toLocaleString() : 0}`,
        name: "Net Salary",
        colorDark: "rgba(229, 166, 71, 1)",
        colorLight: "rgba(66, 133, 244, 0.2)",
        icon: "bi bi-pie-chart-fill"
      }
    ]

    this.chartOptions = {
      chart: {
        type: 'pie',
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '99%',
          borderWidth: 20,
          borderColor: null,
          slicedOffset: 5,
          dataLabels: {
            connectorWidth: 0,
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto">{series.name}</span><br>',
        pointFormat: `<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto; color:{point.color}">{point.name}</span>: <b>${this.currency}{point.value}K</b> <br/>`
      },
      title: {
        verticalAlign: 'middle',
        floating: false,
        text: ''
      },
      legend: {
        enabled: true
      },
      series: [
        {
          type: 'pie',
          name: 'Net Salary',
          data: this.generateDeptPayroll()
        }
      ]
    }

    this.expenseData = [
      {
        "name": "Jan",
        "value": 2272,
      },
      {
        "name": "Feb",
        "value": 1000
      },
      {
        "name": "Mar",
        "value": 2215
      },
      {
        "name": "Apr",
        "value": 2563
      },
      {
        "name": "May",
        "value": 1960
      },
      {
        "name": "Jun",
        "value": 2017
      },
      {
        "name": "Jul",
        "value": 2965
      },
      {
        "name": "Aug",
        "value": 2573
      },
      {
        "name": "Sep",
        "value": 1940
      },
      {
        "name": "Oct",
        "value": 2046
      },
      {
        "name": "Nov",
        "value": 1750
      },
      {
        "name": "Dec",
        "value": 2017
      }
    ]
  
  }

  generateDeptPayroll() {
    let deptPayrollData = [];
    this.departmentList['data'].map((x, i) => {
      let info = {
        name: x.departmentName,
        y: Math.floor(Math.random() * 10) + 4,
        value: Math.floor(Math.random() * 15) + 3,
        color: this.colorScheme.domain[i]
      }

      deptPayrollData.push(info);
    })
    console.log(deptPayrollData);
    return deptPayrollData
  }

  checkLocation(userPos) {
    const officePos: [number, number] = [6.4293011410936725, 3.4184931377760366];
    // [6.595643351234309, 3.3544838956325185]
    // [6.4293011410936725, 3.4184931377760366]
    return this.sharedService._getDistanceFromLatLonInKm(officePos, userPos);
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
