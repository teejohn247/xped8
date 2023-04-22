import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { PayrollSummaryComponent } from './payroll/payroll-summary/payroll-summary.component';
import { RecruitmentJobBoardComponent } from './recruitment/recruitment-job-board/recruitment-job-board.component';
import { RecruitmentOnboardingComponent } from './recruitment/recruitment-onboarding/recruitment-onboarding.component';
import { RecruitmentOverviewComponent } from './recruitment/recruitment-overview/recruitment-overview.component';
import { RecruitmentPortalComponent } from './recruitment/recruitment-portal/recruitment-portal.component';
import { RecruitmentScreeningComponent } from './recruitment/recruitment-screening/recruitment-screening.component';
import { SelfServiceLeaveRequestsComponent } from './self-service/self-service-leave-requests/self-service-leave-requests.component';
import { SelfServiceOverviewComponent } from './self-service/self-service-overview/self-service-overview.component';
import { SelfServicePayrollComponent } from './self-service/self-service-payroll/self-service-payroll.component';
import { SelfServicePortalComponent } from './self-service/self-service-portal/self-service-portal.component';
import { SelfServiceReimbursementComponent } from './self-service/self-service-reimbursement/self-service-reimbursement.component';


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
      },
      {
        path: 'reimbursement',
        component: SelfServiceReimbursementComponent
      }
    ]
  },
  {
    path: 'recruitment',
    component: RecruitmentPortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path : 'overview',
        component: RecruitmentOverviewComponent
      },
      {
        path : 'job-board',
        component: RecruitmentJobBoardComponent
      },
      {
        path: 'applicant-screening',
        component: RecruitmentScreeningComponent
      },
      {
        path: 'onboarding',
        component: RecruitmentOnboardingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
