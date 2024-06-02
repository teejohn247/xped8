import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-portal',
  templateUrl: './support-portal.component.html',
  styleUrls: ['./support-portal.component.scss']
})
export class SupportPortalComponent implements OnInit {

  tabMenu = [
    {
      routeLink: 'details',
      label: 'Details',
    },
    {
      routeLink: 'activities',
      label: 'Activities',
    },
    {
      routeLink: 'history',
      label: 'History',
    },
    {
      routeLink: 'notes',
      label: 'Notes',
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
