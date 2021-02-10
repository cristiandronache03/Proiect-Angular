import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedRoutingModule} from './feed-routing.module';
import {FeedComponent} from "./feed/feed.component";
import {UserPostComponent} from "./user-post/user-post.component";
import {SharedModule} from "../_shared/shared.module";
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FeedComponent,
    UserPostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeedRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class FeedModule {
}
