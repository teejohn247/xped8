import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiloDashboardComponent } from './silo-dashboard/silo-dashboard.component';
import { SiloModulesComponent } from './silo-modules/silo-modules.component';
import { SiloCompaniesComponent } from './silo-companies/silo-companies.component';
import { SiloCompanyDetailsComponent } from './silo-company-details/silo-company-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full'
    //component: EmployeesListComponent
  },
  {
    path: 'dashboard',
    component: SiloDashboardComponent
  },
  {
    path: 'modules',
    component: SiloModulesComponent
  },
  {
    path: 'companies',
    component: SiloCompaniesComponent
  },
  {
    path: 'companies/:id',
    component: SiloCompanyDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiloRoutingModule { }
