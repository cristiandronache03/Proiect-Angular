import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { UserPostsService } from 'src/app/_core/api/user-posts.service';
import { User } from 'src/app/_core/models/User';
import { UserService } from 'src/app/_core/services/user.service';
import {UserPost} from "../../_core/models/UserPost";
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.less'],
})
export class UserPostComponent implements OnInit{
  @Input() userPost: UserPost;

  userid: number;

  constructor(private router: Router,
    private userPostsService: UserPostsService,
    private userService: UserService,
    private feedComponent: FeedComponent)
    {
      this.userService.userStream.subscribe((user: User) => {
        this.userid = user.id;
    });
  }

  ngOnInit(): void {

  }

  deletepPostById(postid : number){
      var index = this.feedComponent.userPosts.findIndex((post: UserPost) => post.id === postid);
      this.feedComponent.userPosts.splice(index,1);
  }

  goToUserPostDetails()
  {
    this.router.navigate(['user-post-details/' + this.userPost.id]);
  }

  goToUserProfile()
  {
    this.router.navigate(['profile/' + this.userPost.userId]);
  }

  likePost(postid: number)
  {
    this.userPostsService.likePost(postid.toString(),this.userid.toString()).subscribe(
      () => {this.feedComponent.getUserPosts();}
    );
  }

  deletePost(postid: number)
  {
    if(confirm("Are you sure to delete this post?")) {
      this.userPostsService.deletePost(this.userid.toString(),postid.toString()).subscribe(
        (userPost: UserPost) => {
          console.log(userPost);
          
          this.deletepPostById(userPost.id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
