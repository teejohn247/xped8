import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communication-portal',
  templateUrl: './communication-portal.component.html',
  styleUrls: ['./communication-portal.component.scss']
})
export class CommunicationPortalComponent implements OnInit {

  tabMenu = [
    {
      routeLink: 'overview',
      label: 'Overview',
    },
    {
      routeLink: 'email',
      label: 'Email Messages',
    },
    {
      routeLink: 'sms',
      label: 'SMS Messages',
    },
    {
      routeLink: 'newsletter',
      label: 'Newsletter',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
