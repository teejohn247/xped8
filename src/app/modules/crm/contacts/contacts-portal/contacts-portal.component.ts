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
