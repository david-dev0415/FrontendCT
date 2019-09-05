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
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    ReportsComponent,
    NavbarComponent,
    ForbiddenComponent,
    SignUpComponent,
    AboutComponent
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
