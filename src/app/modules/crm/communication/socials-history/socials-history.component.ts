import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-socials-history',
  templateUrl: './socials-history.component.html',
  styleUrls: ['./socials-history.component.scss']
})
export class SocialsHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  truncateText(text:string, n:number) {
    return text.substring(0, n) + "\u2026"
  }

}
