import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Chart, Options } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-self-service-overview',
  templateUrl: './self-service-overview.component.html',
  styleUrls: ['./self-service-overview.component.scss']
})
export class SelfServiceOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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
