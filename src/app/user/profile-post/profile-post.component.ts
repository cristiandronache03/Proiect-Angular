import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { UserPostsService } from 'src/app/_core/api/user-posts.service';
import { User } from 'src/app/_core/models/User';
import { UserService } from 'src/app/_core/services/user.service';
import {UserPost} from "../../_core/models/UserPost";

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.less'],
})
export class ProfilePostComponent implements OnInit {
  @Input() userPost: UserPost;

  userid: number;

  constructor(private router: Router){

  }

  ngOnInit(): void {

  }

  goToUserPostDetails()
  {
    this.router.navigate(['user-post-details/' + this.userPost.id]);
  }

}
