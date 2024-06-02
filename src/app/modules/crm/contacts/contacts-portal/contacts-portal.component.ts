import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-portal',
  templateUrl: './contacts-portal.component.html',
  styleUrls: ['./contacts-portal.component.scss']
})
export class ContactsPortalComponent implements OnInit {

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
