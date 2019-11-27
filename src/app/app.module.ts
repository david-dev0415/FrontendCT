/**
 * Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountComponent } from './components/account/account.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AboutComponent } from './components/about/about.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

/**
 * Config Route
 */
import { AuthGuard } from './auth/auth.guard';


/**
 * Interceptor
 */
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpErrorInterceptor } from './shared/HttpErrorInterceptor';

/**
 * Services
 */
import { UserService } from './shared/services/user.service';
import { ReportsService } from './shared/services/reports.service';
import { NumbersOnlyDirective } from './directives/number-only.directive';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPanelComponentComponent } from './components/admin-panel-component/admin-panel-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    ReportsComponent,
    NavbarComponent,
    ForbiddenComponent,
    SignUpComponent,
    AboutComponent,
    AccountComponent,
    NumbersOnlyDirective,
    RequestPasswordComponent,
    FooterComponent,
    AdminPanelComponentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    ReportsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
