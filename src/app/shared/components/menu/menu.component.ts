import { Component, OnInit } from '@angular/core';
import { navbarData } from 'src/app/core/constants/nav-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  collapsed = false;
  menuData = navbarData;
  currentLink = 'Dashboard';

  constructor() { }

  ngOnInit(): void {
  }

}
