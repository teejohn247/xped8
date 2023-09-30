import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { GeneralSettingsComponent } from './general/general-settings/general-settings.component';
import { SelectSystemRolesComponent } from './general/select-system-roles/select-system-roles.component';
import { HumanResourcesSettingsComponent } from './human-resources/human-resources-settings/human-resources-settings.component';
import { DesignationInfoComponent } from './human-resources/designation-info/designation-info.component';
import { LeaveTypeInfoComponent } from './human-resources/leave-type-info/leave-type-info.component';
import { DepartmentInfoComponent } from './human-resources/department-info/department-info.component';


@NgModule({
  declarations: [
    GeneralSettingsComponent,
    SelectSystemRolesComponent,
    HumanResourcesSettingsComponent,
    DesignationInfoComponent,
    LeaveTypeInfoComponent,
    DepartmentInfoComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
