import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { CrmRoutingModule } from './crm-routing.module';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { LeadsPortalComponent } from './leads/leads-portal/leads-portal.component';
import { ContactsPortalComponent } from './contacts/contacts-portal/contacts-portal.component';
import { SupportPortalComponent } from './support/support-portal/support-portal.component';
import { SupportOverviewComponent } from './support/support-overview/support-overview.component';
import { ContactsOverviewComponent } from './contacts/contacts-overview/contacts-overview.component';
import { LeadsOverviewComponent } from './leads/leads-overview/leads-overview.component';
import { ContactsProfileComponent } from './contacts/contacts-profile/contacts-profile.component';
import { ContactInfoComponent } from './contacts/contact-info/contact-info.component';
import { TicketDetailsComponent } from './support/ticket-details/ticket-details.component';
import { TicketInfoComponent } from './support/ticket-info/ticket-info.component';
import { TicketHistoryComponent } from './support/ticket-history/ticket-history.component';
import { TicketActivitiesComponent } from './support/ticket-activities/ticket-activities.component';
import { LeadsProfileComponent } from './leads/leads-profile/leads-profile.component';
import { AgentsOverviewComponent } from './agents/agents-overview/agents-overview.component';
import { AgentsPortalComponent } from './agents/agents-portal/agents-portal.component';
import { AgentInfoComponent } from './agents/agent-info/agent-info.component';
import { AgentsProfileComponent } from './agents/agents-profile/agents-profile.component';
import { LeadsInfoComponent } from './leads/leads-info/leads-info.component';


@NgModule({
  declarations: [
    DashboardOverviewComponent,
    LeadsPortalComponent,
    ContactsPortalComponent,
    SupportPortalComponent,
    SupportOverviewComponent,
    ContactsOverviewComponent,
    LeadsOverviewComponent,
    ContactsProfileComponent,
    ContactInfoComponent,
    TicketDetailsComponent,
    TicketInfoComponent,
    TicketHistoryComponent,
    TicketActivitiesComponent,
    LeadsProfileComponent,
    AgentsOverviewComponent,
    AgentsPortalComponent,
    AgentInfoComponent,
    AgentsProfileComponent,
    LeadsInfoComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule,
    HighchartsChartModule
  ]
})
export class CrmModule { }
