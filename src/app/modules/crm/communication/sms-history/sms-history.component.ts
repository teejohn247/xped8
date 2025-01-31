import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms-history',
  templateUrl: './sms-history.component.html',
  styleUrls: ['./sms-history.component.scss']
})
export class SmsHistoryComponent implements OnInit {

  smsModalOpened: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  truncateText(text:string, n:number) {
    return text.substring(0, n) + "\u2026"
  }

}
