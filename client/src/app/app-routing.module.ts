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
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';

const routes: Routes = [
  { path: '', component: RegisterComponent,   },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]  },
  { path: 'navigation', component: NavigationComponent, canActivate:[AuthGuard]   },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent, canActivate:[AuthGuard] },
  { path: 'patient', component: PatientsComponent , canActivate:[AuthGuard]  },
  { path: 'case', component: CaseComponent, canActivate:[AuthGuard]  },
  { path: 'appointment', component: AppointmentComponent , canActivate:[AuthGuard]  },
  {path:  'update-Patient/:id1/:id2', component: UpdatePatientComponent, canActivate:[AuthGuard]  },
  {path:  'update-case/:id', component:UpdateCaseComponent , canActivate:[AuthGuard]  },
  {path:  'update-appointment/:id', component:UpdateAppointmentComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
