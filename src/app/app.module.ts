import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { NotificationButtonComponent } from './components/notification-button/notification-button.component';
import { ButtonLinkNotificationComponent } from './components/button-link-notification/button-link-notification.component';
import { ButtonNavigationComponent } from './components/button-navigation/button-navigation.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ButtonComponent,
    ButtonLinkComponent,
    NotificationButtonComponent,
    ButtonLinkNotificationComponent,
    ButtonNavigationComponent,
    IconButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
