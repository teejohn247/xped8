import { Component, OnInit, Input } from '@angular/core';
import { navbarData, navbarDataReg, navbarDataManager, navbarDataSilo } from 'src/app/core/constants/nav-data';
import { AuthenticationService } from '../../services/utils/authentication.service';
import { NotificationService } from '../../services/utils/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userDetails:any;
  userName:string;
  userRole:string;
  profilePhoto: string;
  sideModalOpened:boolean = false;
  currentLink = 'Human Resources';

  adminMenuData = navbarData;
  regMenuData = navbarDataReg;
  managerMenuData = navbarDataManager;
  siloMenuData = navbarDataSilo;

  constructor(
    private route: Router,
    private authService: AuthenticationService, 
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    if(this.userDetails.data.isSuperAdmin) {
      this.userName = this.userDetails.data.companyName + ' Company';
      this.userRole = 'Super Admin';
    }
    else if(this.userDetails.data.email == 'siloerp@silo-inc.com') {
      this.userName = this.userDetails.data.companyName;
      this.userRole = 'Silo Admin';
    }
    else {
      this.userName = this.userDetails.data.fullName;
      this.userRole = this.userDetails.data.companyRole;
      this.profilePhoto = this.userDetails.data.profilePic;
    }
  }

  openMenu() {
    let urlsplit = this.route.url?.split("/");
    console.log('LoginUrl', urlsplit);

    switch (urlsplit[2]) {
      case "human-resources":
        this.currentLink = 'Human Resources';
        break;
      case "crm":
        this.currentLink = 'CRM';
        break;
      case "settings":
        this.currentLink = 'Settings';
        break;
      default :
        break;
    }

    this.sideModalOpened = true
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
