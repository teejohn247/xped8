import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agents-portal',
  templateUrl: './agents-portal.component.html',
  styleUrls: ['./agents-portal.component.scss']
})
export class AgentsPortalComponent implements OnInit {

  tabMenu = [
    {
      routeLink: 'profile',
      label: 'Profile & Activities',
    },
    {
      routeLink: 'sales-orders',
      label: 'Sales Orders',
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
