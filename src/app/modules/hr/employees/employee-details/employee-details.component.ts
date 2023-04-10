import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Chart, Options } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  // @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  // doughnutChart: any;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   this.doughnutChartMethod();
  // }

  goBack() {
    this.location.back();
  }

  // doughnutChartMethod() {
  //   this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['BJP', 'Congress'],
  //       datasets: [
  //         {
  //           //label: '# of Votes',
  //           data: [50, 50],
  //           borderJoinStyle: 'round',
  //           backgroundColor: [
  //             'rgba(255, 159, 64, 0.2)',
  //             'rgba(255, 99, 132, 0.2)',
  //           ],
  //           hoverBackgroundColor: [
  //             '#FFCE56',
  //             '#FF6384',
  //           ],
  //           borderWidth: 0
  //         },
  //       ],
  //     },
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: false
  //         }
  //       },
  //       cutout: 100,
  //       responsive: true,
  //       //aspectRatio: 1,
  //       maintainAspectRatio: false,
  //       radius: 60
  //     }
  //   });
  // }

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Options = {
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
          {name: 'Days Used', y: 60, value: 21, color: '#f08585'},
          {name: 'Days Left', y: 40, value: 14, color: '#4dc781'},
        ]
      }
    ]
  }

}
