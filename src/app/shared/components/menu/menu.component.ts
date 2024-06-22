import { Component, OnInit, Input } from '@angular/core';
import { navbarData, navbarDataReg, navbarDataManager } from 'src/app/core/constants/nav-data';
import { AuthenticationService } from '../../services/utils/authentication.service';
import { NotificationService } from '../../services/utils/notification.service';
import { Router } from '@angular/router';

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

  currentLink = 'Human Resources';

  constructor(
    private route: Router,
    private authService: AuthenticationService, 
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    console.log(this.userDetails);
    if(this.userDetails.data.isSuperAdmin) {
      this.collapsed = false;
      this.currentLink = 'Human Resources';
    };
    let urlsplit = this.route.url?.split("/");
    console.log(urlsplit);
    if(urlsplit[2] == 'human-resources') this.currentLink = 'Human Resources';
    if(urlsplit[2] == 'crm') this.currentLink = 'CRM';
    if(urlsplit[2] == 'settings') this.currentLink = 'Settings';
  }


  //Logout function
  logout() {
    this.notifyService.confirmAction({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.authService.logout();
      }
    });
  }

}
