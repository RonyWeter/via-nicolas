import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.modules';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OthersComponent } from './others/others.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [
    TicketsListComponent,
    TicketComponent,
    DashboardComponent,
    OthersComponent,
    RequestComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule
  ],
  exports: []
})
export class ModulesModule { }
