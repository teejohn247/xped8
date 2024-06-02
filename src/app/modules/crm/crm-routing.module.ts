import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { LeadsPortalComponent } from './leads/leads-portal/leads-portal.component';
import { LeadsOverviewComponent } from './leads/leads-overview/leads-overview.component';
import { ContactsPortalComponent } from './contacts/contacts-portal/contacts-portal.component';
import { ContactsOverviewComponent } from './contacts/contacts-overview/contacts-overview.component';
import { SupportPortalComponent } from './support/support-portal/support-portal.component';
import { SupportOverviewComponent } from './support/support-overview/support-overview.component';
import { ContactsProfileComponent } from './contacts/contacts-profile/contacts-profile.component';
import { TicketDetailsComponent } from './support/ticket-details/ticket-details.component';
import { AgentsOverviewComponent } from './agents/agents-overview/agents-overview.component';
import { AgentsPortalComponent } from './agents/agents-portal/agents-portal.component';
import { AgentsProfileComponent } from './agents/agents-profile/agents-profile.component';
import { LeadsProfileComponent } from './leads/leads-profile/leads-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardOverviewComponent
  },
  {
    path: 'leads',
    component: LeadsOverviewComponent,
  },
  {
    path: 'leads/:id',
    component: LeadsPortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path : 'profile',
        component: LeadsProfileComponent
      },
    ]
  },
  {
    path: 'contacts',
    component: ContactsOverviewComponent,
  },
  {
    path: 'contacts/:id',
    component: ContactsPortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path : 'profile',
        component: ContactsProfileComponent
      },
    ]
  },
  {
    path: 'support',
    component: SupportOverviewComponent,
  },
  {
    path: 'support/:id',
    component: SupportPortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full'
      },
      {
        path : 'details',
        component: TicketDetailsComponent
      },
    ]
  },
  {
    path: 'agents',
    component: AgentsOverviewComponent,
  },
  {
    path: 'agents/:id',
    component: AgentsPortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path : 'profile',
        component: AgentsProfileComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
