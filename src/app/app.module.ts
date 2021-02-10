import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserPostDetailsComponent} from './user-post-details/user-post-details.component';
import {HttpClientModule} from '@angular/common/http';
import {FollowersListComponent} from './followers-list/followers-list.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {UserCardComponent} from './user/user-card/user-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommentComponent} from './user/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    UserPostDetailsComponent,
    FollowersListComponent,
    SearchResultComponent,
    UserCardComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
