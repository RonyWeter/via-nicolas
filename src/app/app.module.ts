import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.modules';
import { MainComponent } from './main/main/main.component';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { NotificationComponent } from './shared/components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConfirmationComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
