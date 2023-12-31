import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { PatientsComponent } from './components/patients/patients.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CaseComponent } from './components/case/case.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatError } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewAllPatientsComponent } from './components/view-all-patients/view-all-patients.component';
import { ViewAllCasesComponent } from './components/view-all-cases/view-all-cases.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartUsingNpxChartsComponent } from './components/chart-using-ngx-charts/chart-using-ngx-charts.component';
import { ViewAllAppointmentsComponent } from './components/view-all-appointments/view-all-appointments.component';
import { UpdateComponent } from './components/update/update.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    HomeComponent,
    PatientsComponent,
    CaseComponent,
    AppointmentComponent,
    UpdatePatientComponent,
    UpdateCaseComponent,
    UpdateAppointmentComponent,
    ViewAllPatientsComponent,
    ViewAllCasesComponent,
    ChartsComponent,
    ChartUsingNpxChartsComponent,
    ViewAllAppointmentsComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),  
    MatSnackBarModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxMatSelectSearchModule,
    HttpClientModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    NgxChartsModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
