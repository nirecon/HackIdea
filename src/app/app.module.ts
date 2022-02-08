import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './components/add-item/add-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const firebaseConfig = {
  apiKey: 'AIzaSyBr9Nv6ys65vH4NK6glTjWZsfatewEX9Zw',
  authDomain: 'hackidea-96309.firebaseapp.com',
  projectId: 'hackidea-96309',
  storageBucket: 'hackidea-96309.appspot.com',
  messagingSenderId: '1001075147583',
  appId: '1:1001075147583:web:09d938decfa60e3f11498a',
  measurementId: 'G-5FT86E8956',
};
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    LandingPageComponent,
    SignupComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
