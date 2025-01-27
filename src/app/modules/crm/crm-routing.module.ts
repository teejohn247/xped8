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
import { SalesOverviewComponent } from './sales/sales-overview/sales-overview.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { NotesComponent } from './shared/notes/notes.component';
import { SalesOrdersComponent } from './shared/sales-orders/sales-orders.component';
import { CommunicationPortalComponent } from './communication/communication-portal/communication-portal.component';
import { CommunicationOverviewComponent } from './communication/communication-overview/communication-overview.component';
import { EmailInfoComponent } from './communication/email-info/email-info.component';
import { SmsInfoComponent } from './communication/sms-info/sms-info.component';
import { NewsletterInfoComponent } from './communication/newsletter-info/newsletter-info.component';
import { EmailHistoryComponent } from './communication/email-history/email-history.component';
import { SmsHistoryComponent } from './communication/sms-history/sms-history.component';
import { NewsletterHistoryComponent } from './communication/newsletter-history/newsletter-history.component';
import { CalendarScheduleComponent } from './calendar/calendar-schedule/calendar-schedule.component';
import { SocialsHistoryComponent } from './communication/socials-history/socials-history.component';

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
      {
        path : 'notes',
        component: NotesComponent
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
      {
        path : 'sales-orders',
        component: SalesOrdersComponent
      },
      {
        path : 'notes',
        component: NotesComponent
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
      {
        path : 'sales-orders',
        component: SalesOrdersComponent
      },
      {
        path : 'notes',
        component: NotesComponent
      },
    ]
  },
  {
    path: 'sales',
    component: SalesOverviewComponent,
  },
  {
    path: 'sales/:id',
    component: SalesDetailsComponent
  },
  {
    path: 'communication',
    component: CommunicationPortalComponent,
    children:[
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path : 'overview',
        component: CommunicationOverviewComponent
      },
      {
        path : 'email',
        component: EmailHistoryComponent
      },
      {
        path : 'sms',
        component: SmsHistoryComponent
      },
      {
        path: 'newsletter',
        component: NewsletterHistoryComponent
      },
      {
        path: 'socials',
        component: SocialsHistoryComponent
      },
    ]
  },
  {
    path: 'calendar',
    component: CalendarScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
