import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingsComponent } from './general/general-settings/general-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general-settings',
    pathMatch: 'full'
    //component: EmployeesListComponent
  },
  {
    path: 'general-settings',
    component: GeneralSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
