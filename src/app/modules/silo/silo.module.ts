import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SiloRoutingModule } from './silo-routing.module';
import { SiloCompaniesComponent } from './silo-companies/silo-companies.component';
import { SiloDashboardComponent } from './silo-dashboard/silo-dashboard.component';
import { SiloCompanyDetailsComponent } from './silo-company-details/silo-company-details.component';
import { SiloModulesComponent } from './silo-modules/silo-modules.component';
import { SiloPermissionInfoComponent } from './silo-permission-info/silo-permission-info.component';
import { SiloRoleInfoComponent } from './silo-role-info/silo-role-info.component';
import { SiloSubscriptionActivationComponent } from './silo-subscription-activation/silo-subscription-activation.component';


@NgModule({
  declarations: [
    SiloCompaniesComponent,
    SiloDashboardComponent,
    SiloCompanyDetailsComponent,
    SiloModulesComponent,
    SiloPermissionInfoComponent,
    SiloRoleInfoComponent,
    SiloSubscriptionActivationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SiloRoutingModule
  ]
})
export class SiloModule { }
