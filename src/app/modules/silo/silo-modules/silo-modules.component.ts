import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { siloModules } from 'src/app/core/constants/modules-data';
import { SiloPermissionInfoComponent } from '../silo-permission-info/silo-permission-info.component';

@Component({
  selector: 'app-silo-modules',
  templateUrl: './silo-modules.component.html',
  styleUrls: ['./silo-modules.component.scss']
})
export class SiloModulesComponent implements OnInit {

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

  ) { }

  toggleModuleInfo(moduleName:string) {
    this.activeTab == moduleName ? this.activeTab = '' : this.activeTab = moduleName
  }

  ngOnInit(): void {
  }

  //Create New Permission
  createPermission() {
    this.dialog.open(SiloPermissionInfoComponent, {
      width: '40%',
      height: 'auto',
      data: {
        isExisting: false,
        moduleList: this.companyModules,
        featureList: siloModules[0].moduleFeatures
      },
    }).afterClosed().subscribe(() => {
      //this.getPageData();
    });
  }

}
