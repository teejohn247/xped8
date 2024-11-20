import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { siloModules } from 'src/app/core/constants/modules-data';
import { SiloAdminService } from 'src/app/shared/services/silo/silo-admin.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SiloSubscriptionActivationComponent } from '../silo-subscription-activation/silo-subscription-activation.component';
import { SiloRoleInfoComponent } from '../silo-role-info/silo-role-info.component';

@Component({
  selector: 'app-silo-company-details',
  templateUrl: './silo-company-details.component.html',
  styleUrls: ['./silo-company-details.component.scss']
})
export class SiloCompanyDetailsComponent implements OnInit {

  companyId: string;
  companyList: any[] = [];
  companyInView: any;
  activeTab:string;
  companyModules = siloModules

  companyRoles = [
    {
      roleId: 1,
      roleName: 'Super Admin',
      rolePermissions: [
        {
          moduleId: 1,
          featureId: 1,
          permissionKey: 'canViewEmployees',
          permissionName: 'Can View Employees',
          permissionValue: true
        }
      ]
    },
    {
      roleId: 2,
      roleName: 'HR Admin',
      rolePermissions: [
        {
          moduleId: 1,
          featureId: 1,
          permissionKey: 'canViewEmployees',
          permissionName: 'Can View Employees',
          permissionValue: true
        }
      ]
    }
  ]


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute:ActivatedRoute, 
    private siloAdminService: SiloAdminService,    
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params["id"];
    this.getPageData();
  }

  getPageData = async () => {
    this.companyList = await this.siloAdminService.getAllCompanies().toPromise();
    console.log(this.companyList);
    this.companyInView = this.companyList['data'].find(company => this.companyId == company._id)
    console.log(this.companyInView);
  }

  goBack() {
    this.location.back();
  }

  toggleModuleInfo(moduleName:string) {
    this.activeTab == moduleName ? this.activeTab = '' : this.activeTab = moduleName
  }

  //Activate Subscription
  activateSubscription() {
    this.dialog.open(SiloSubscriptionActivationComponent, {
      width: '40%',
      height: 'auto',
      data: {
        isExisting: false,
        moduleList: this.companyModules
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }


  //Create New Role
  createRole() {
    this.dialog.open(SiloRoleInfoComponent, {
      width: '40%',
      height: 'auto',
      data: {
        isExisting: false,
        moduleList: this.companyModules
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

}
