import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { HrRoutingModule } from './hr-routing.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeModule } from 'ngx-gauge';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AutosizeModule } from 'ngx-autosize';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { SelfServicePortalComponent } from './self-service/self-service-portal/self-service-portal.component';
import { SelfServiceLeaveRequestsComponent } from './self-service/self-service-leave-requests/self-service-leave-requests.component';
import { SelfServicePayrollComponent } from './self-service/self-service-payroll/self-service-payroll.component';
import { SelfServiceReimbursementComponent } from './self-service/self-service-reimbursement/self-service-reimbursement.component';
import { SelfServiceOverviewComponent } from './self-service/self-service-overview/self-service-overview.component';
import { PayrollSummaryComponent } from './payroll/payroll-summary/payroll-summary.component';
import { RecruitmentOverviewComponent } from './recruitment/recruitment-overview/recruitment-overview.component';
import { RecruitmentJobBoardComponent } from './recruitment/recruitment-job-board/recruitment-job-board.component';
import { RecruitmentPortalComponent } from './recruitment/recruitment-portal/recruitment-portal.component';
import { RecruitmentScreeningComponent } from './recruitment/recruitment-screening/recruitment-screening.component';
import { RecruitmentOnboardingComponent } from './recruitment/recruitment-onboarding/recruitment-onboarding.component';
import { VisitorsLogComponent } from './visitors-log/visitors-log/visitors-log.component';
import { GeneralAppraisalComponent } from './appraisals/general-appraisal/general-appraisal.component';
import { LeaveManagementOverviewComponent } from './leave-management/leave-management-overview/leave-management-overview.component';
import { BulkUploadComponent } from './employees/bulk-upload/bulk-upload.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { CreateKpiGroupComponent } from './appraisals/create-kpi-group/create-kpi-group.component';
import { CreateKpiComponent } from './appraisals/create-kpi/create-kpi.component';
import { CreateAppraisalPeriodComponent } from './appraisals/create-appraisal-period/create-appraisal-period.component';
import { AppraisalFormComponent } from './appraisals/appraisal-form/appraisal-form.component';
import { CreateRatingScaleComponent } from './appraisals/create-rating-scale/create-rating-scale.component';
import { PayrollDetailsComponent } from './payroll/payroll-details/payroll-details.component';
import { PayrollUploadComponent } from './payroll/payroll-upload/payroll-upload.component';
import { ExpenseManagementComponent } from './expense-management/expense-management/expense-management.component';
import { ExpenseRequestReviewComponent } from './expense-management/expense-request-review/expense-request-review.component';
import { PayrollPortalComponent } from './payroll/payroll-portal/payroll-portal.component';
import { PayrollPeriodDetailsComponent } from './payroll/payroll-period-details/payroll-period-details.component';
import { PayrollCalculatorComponent } from './payroll/payroll-calculator/payroll-calculator.component';
import { AssignManagerApproversComponent } from './employees/assign-manager-approvers/assign-manager-approvers.component';
import { PayslipComponent } from './payroll/payslip/payslip.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MeetingInfoComponent } from './calendar/meeting-info/meeting-info.component';
import { JobPostInfoComponent } from './recruitment/job-post-info/job-post-info.component';
import { RecruitmentApplicantsComponent } from './recruitment/recruitment-applicants/recruitment-applicants.component';
import { RecruitmentApplicantFormComponent } from './recruitment/recruitment-applicant-form/recruitment-applicant-form.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { RecruitmentMasterListComponent } from './recruitment/recruitment-master-list/recruitment-master-list.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { WorkLocationComponent } from './attendance/work-location/work-location.component';


@NgModule({
  declarations: [
    EmployeesListComponent, 
    EmployeeDetailsComponent, 
    SelfServicePortalComponent, 
    SelfServiceLeaveRequestsComponent, 
    SelfServicePayrollComponent, 
    SelfServiceReimbursementComponent, SelfServiceOverviewComponent, PayrollSummaryComponent, RecruitmentOverviewComponent, RecruitmentJobBoardComponent, RecruitmentPortalComponent, RecruitmentScreeningComponent, RecruitmentOnboardingComponent, VisitorsLogComponent, GeneralAppraisalComponent, LeaveManagementOverviewComponent, BulkUploadComponent, EditEmployeeComponent, CreateKpiGroupComponent, CreateKpiComponent, CreateAppraisalPeriodComponent, AppraisalFormComponent, CreateRatingScaleComponent, PayrollDetailsComponent, PayrollUploadComponent, ExpenseManagementComponent, ExpenseRequestReviewComponent, PayrollPortalComponent, PayrollPeriodDetailsComponent, PayrollCalculatorComponent, AssignManagerApproversComponent, PayslipComponent, CalendarComponent, MeetingInfoComponent, JobPostInfoComponent, RecruitmentApplicantsComponent, RecruitmentApplicantFormComponent, AttendanceListComponent, RecruitmentMasterListComponent, DashboardComponent, WorkLocationComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule,
    HighchartsChartModule,
    NgbModalModule,
    NgxChartsModule,
    NgxGaugeModule,
    GoogleMapsModule,
    NgxMaterialTimepickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AutosizeModule
  ]
})
export class HrModule { }
