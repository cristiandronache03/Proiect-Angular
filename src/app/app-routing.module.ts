import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegisterComponent} from './user/register/register.component';
import {UserPostDetailsComponent} from './user-post-details/user-post-details.component';
import {AuthGuardService} from './_core/guards/auth-guard.service';
import {UnAuthGuardService} from './_core/guards/unauth-guard.service';
import {LoginComponent} from './user/login/login.component';
import {FollowersListComponent} from './followers-list/followers-list.component';
import {ProfileComponent} from './user/profile/profile.component';
import {SearchResultComponent} from './search-result/search-result.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'feed',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnAuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthGuardService]
  },
  {
    path: 'user-post-details/:id',
    canActivate: [AuthGuardService],
    component: UserPostDetailsComponent,
  },
  {
    path: 'profile/:id',
    canActivate: [AuthGuardService],
    component: ProfileComponent,
  },
  {
    path: 'search-result/:name',
    canActivate: [AuthGuardService],
    component: SearchResultComponent,
  },
  {
    path: 'followers',
    canActivate: [AuthGuardService],
    component: FollowersListComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
