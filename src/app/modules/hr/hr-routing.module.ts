import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { PayrollSummaryComponent } from './payroll/payroll-summary/payroll-summary.component';
import { SelfServiceLeaveRequestsComponent } from './self-service/self-service-leave-requests/self-service-leave-requests.component';
import { SelfServiceOverviewComponent } from './self-service/self-service-overview/self-service-overview.component';
import { SelfServicePayrollComponent } from './self-service/self-service-payroll/self-service-payroll.component';
import { SelfServicePortalComponent } from './self-service/self-service-portal/self-service-portal.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
    //component: EmployeesListComponent
  },
  {
    path: 'employees',
    component: EmployeesListComponent
  },
  {
    path: 'employees/employee-details',
    component: EmployeeDetailsComponent
  },
  {
    path: 'payroll',
    component: PayrollSummaryComponent
  },
  {
    path: 'self-service',
    component: SelfServicePortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path : 'overview',
        component: SelfServiceOverviewComponent
      },
      {
        path : 'leave-requests',
        component: SelfServiceLeaveRequestsComponent
      },
      {
        path: 'payroll',
        component: SelfServicePayrollComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
