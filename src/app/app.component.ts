import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'xped8';
  isMobile:boolean = false;

  ngOnInit(): void {
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.isMobile = true;
      sessionStorage.setItem('isMobile', JSON.stringify(this.isMobile));
    }
    else {
      sessionStorage.setItem('isMobile', JSON.stringify(this.isMobile));
    }
  }
}
