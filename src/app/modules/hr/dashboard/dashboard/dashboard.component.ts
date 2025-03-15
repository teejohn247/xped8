import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { SharedService } from 'src/app/shared/services/utils/shared.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

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
  checkedIn: boolean = false;
  userLocation: any;

  calendarDetails: any;
  sortedEvents: any[] = [];
  upcomingEvents: any[] = [];

  totalLeaveDays: number;
  leaveDaysUsed: number;
  leaveRecords: any[] = [];
  Leavecharts: typeof Highcharts;
  leaveChartOptions: Options;

  isMobile:boolean;
  
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
      labels: {
        enabled: !this.sharedService.isMobile
      }
    },
    yAxis: {          
      title:{
        text:""
      },
      labels: {
        enabled: !this.sharedService.isMobile,
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

  //Google Maps
  // center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  // zoom = 13.5;
  // mapOptions: google.maps.MapOptions = {
  //   styles: [
  //     {
  //       elementType: 'labels.text',
  //       stylers: [
  //         { color: '#ff0000' },
  //         { fontSize: '6px' }
  //       ]
  //     }
  //   ]
  // }

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  mapZoom = 14;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  // markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {gmpDraggable: false,gmpClickable:true};
  // markerPositions: CustomMapMarkerPosition[] = [];
  // @ViewChild('map', { static: true }) mapElement: any;

  constructor(
    private authService: AuthenticationService,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    public sharedService: SharedService,
  ) {
    setInterval(() => {
      this.dateTime = new Date()
    }, 1000)

    this.userDetails = this.authService.loggedInUser.data;
    this.currency = this.authService.currency ? this.authService.currency : '';
    this.isMobile = sharedService.isMobile;

    this.userDetails.isSuperAdmin ? this.getPageData() : this.getEmployeeData();
  }

  ngOnInit(): void {
    if(!this.userDetails.isSuperAdmin && !this.checkedInStatus) {
      this.sharedService.getCurrentLocation().subscribe(pos=> {
        console.log(pos);
        let checkInTime = new Date();
        let userPos:[number, number] = [pos.latitude, pos.longitude];
        this.userLocation = userPos;
        const point: google.maps.LatLngLiteral = {
          lat: pos.latitude,
          lng: pos.longitude,
        };
  
        this.mapCenter = new google.maps.LatLng(point);
        //this.map.panTo(point);
  
        // this.markerInfoContent = "I'm here!";
  
        this.markerOptions = {
          draggable: false,
          animation: google.maps.Animation.DROP,
        };

        let distanceFromOffice = this.checkLocation(userPos);
        if(distanceFromOffice > 2) {
          this.notifyService.confirmCheckIn({
            title: 'Location Details',
            userLocation: [pos.latitude, pos.longitude],
            message: `You are currently at this position: ${pos.latitude} and ${pos.longitude} shown on the map above which is ${Math.floor(distanceFromOffice).toLocaleString()}km away from the office. Do you want to check in manually as working remotely today?`,
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

  // ngAfterViewInit(): void {
  //   this.addMarkersToMap()
  // }

  get checkedInStatus() {
    if (sessionStorage.getItem('loggedInUser')) {
      return JSON.parse(sessionStorage.getItem('userCheckedIn'));
    }
  }

  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.employeeList = await this.hrService.getEmployees().toPromise();
    this.calendarDetails = await this.hrService.getCalendar().toPromise(); 
    this.calendarDetails = this.calendarDetails['data'];
    this.sortCalendarEvents();   
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
            this.checkedIn = true;
            sessionStorage.setItem('userCheckedIn', JSON.stringify(this.checkedIn));
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

  getEmployeeData = async () => {
    this.payrollPeriods = await this.hrService.getPayrollPeriods().toPromise();
    console.log(this.payrollPeriods);
    this.leaveRecords = this.userDetails.leaveAssignment;
    this.totalLeaveDays = this.leaveRecords.reduce((n, {noOfLeaveDays}) => n + noOfLeaveDays, 0);
    this.leaveDaysUsed = this.leaveRecords.reduce((n, {daysUsed}) => n + daysUsed, 0);
    console.log(this.leaveRecords);

    this.Leavecharts = Highcharts;
    this.leaveChartOptions = {
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
        pointFormat: '<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto; color:{point.color}">{point.name}</span>: <b>{point.value}days</b> <br/>'
      },
      title: {
        verticalAlign: 'middle',
        floating: false,
        text: ''
      },
      legend: {
        enabled: false
      },
      series: [
        {
          type: 'pie',
          name: 'Leave Days',
          data: [
            {
              name: 'Days Used', 
              y: this.leaveDaysUsed*100/this.totalLeaveDays, 
              value: this.leaveDaysUsed, 
              color: '#f08585'
            },
            {
              name: 'Days Left', 
              y: ((this.totalLeaveDays - this.leaveDaysUsed)*100)/this.totalLeaveDays, 
              value: this.totalLeaveDays - this.leaveDaysUsed, 
              color: '#4dc781'
            },
          ]
        }
      ]
    }
  }

  sortCalendarEvents() {
    this.calendarDetails['holidays'].map(event => {
      event['dateRef'] = event.date;
      event['type'] = 'holiday';
      this.sortedEvents.push(event);
    })

    this.calendarDetails['meetings'].map(event => {
      event['dateRef'] = event.meetingStartTime;
      event['type'] = 'meeting';
      this.sortedEvents.push(event);
    })

    this.sortedEvents.sort(function(a, b): any {
      return a.dateRef.localeCompare(b.dateRef);
    });
    
    const today = new Date().getTime();
    this.upcomingEvents = this.sortedEvents.filter((items)  => {
      return new Date(items.dateRef).getTime() > today;
    })
    console.log(this.upcomingEvents);
  }
}
