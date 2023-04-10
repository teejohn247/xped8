import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { HrRoutingModule } from './hr-routing.module';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { SelfServicePortalComponent } from './self-service/self-service-portal/self-service-portal.component';
import { SelfServiceLeaveRequestsComponent } from './self-service/self-service-leave-requests/self-service-leave-requests.component';
import { SelfServicePayrollComponent } from './self-service/self-service-payroll/self-service-payroll.component';
import { SelfServiceReimbursementComponent } from './self-service/self-service-reimbursement/self-service-reimbursement.component';
import { SelfServiceOverviewComponent } from './self-service/self-service-overview/self-service-overview.component';
import { PayrollSummaryComponent } from './payroll/payroll-summary/payroll-summary.component';


@NgModule({
  declarations: [
    EmployeesListComponent, 
    EmployeeDetailsComponent, 
    SelfServicePortalComponent, 
    SelfServiceLeaveRequestsComponent, 
    SelfServicePayrollComponent, 
    SelfServiceReimbursementComponent, SelfServiceOverviewComponent, PayrollSummaryComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule,
    HighchartsChartModule
  ]
})
export class HrModule { }
