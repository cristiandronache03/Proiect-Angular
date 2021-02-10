import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router'; // CLI imports router
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "../_core/guards/auth-guard.service";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
