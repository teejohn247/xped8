import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { UserAuthGuard } from './shared/services/utils/user-auth.guard';


const routes: Routes = [
  {
    path: '', 
    pathMatch: 'prefix', 
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/features/features.module').then(m => m.FeaturesModule),
    canActivate: [UserAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
