import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';


@NgModule({
  declarations: [EmployeesListComponent, EmployeeDetailsComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule
  ]
})
export class HrModule { }
