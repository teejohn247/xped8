import { Component, OnInit, Input } from '@angular/core';
import { navbarData, navbarDataReg, navbarDataManager } from 'src/app/core/constants/nav-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() userDetails:any;
  collapsed = true;
  adminMenuData = navbarData;
  regMenuData = navbarDataReg;
  managerMenuData = navbarDataManager;

  currentLink = 'General';

  constructor() { }

  ngOnInit(): void {
    console.log(this.userDetails);
    if(this.userDetails.data.isSuperAdmin) {
      this.collapsed = false;
      this.currentLink = 'Dashboard';
    };
  }

}
