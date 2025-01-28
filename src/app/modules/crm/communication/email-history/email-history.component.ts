import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-history',
  templateUrl: './email-history.component.html',
  styleUrls: ['./email-history.component.scss']
})
export class EmailHistoryComponent implements OnInit {

  sideModalOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  truncateText(text:string, n:number) {
    return text.substring(0, n) + "\u2026"
  }

}
