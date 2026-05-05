import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.modules';
import { AppModule } from '../app.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule
  ],
  exports: []
})
export class BaseModule { }
