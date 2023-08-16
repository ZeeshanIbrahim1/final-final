import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { PatientsComponent } from './components/patients/patients.component';
import { CaseComponent } from './components/case/case.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../app/auth.guard';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'patient', component: PatientsComponent },
  { path: 'case', component: CaseComponent },
  { path: 'appointment', component: AppointmentComponent },
  {path:'update-Patient/:id', component: UpdatePatientComponent},
  {path:'update-case/:id', component:UpdateCaseComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
