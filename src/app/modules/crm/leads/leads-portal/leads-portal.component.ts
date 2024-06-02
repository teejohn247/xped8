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
      label: 'Profile',
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
      routeLink: 'purchase-orders',
      label: 'Purchase Orders',
    },
    {
      routeLink: 'quotations',
      label: 'Quotations',
    },
    {
      routeLink: 'invoices',
      label: 'Invoices',
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
