import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../guard.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [GuardGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'request', component: RequestComponent },
    ],
  },
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
