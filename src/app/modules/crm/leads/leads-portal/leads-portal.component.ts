import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leads-portal',
  templateUrl: './leads-portal.component.html',
  styleUrls: ['./leads-portal.component.scss']
})
export class LeadsPortalComponent implements OnInit {

  tabMenu = [
    {
      routeLink: 'profile',
      label: 'Profile & Activities',
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
