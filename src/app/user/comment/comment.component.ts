import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Comment} from "../../_core/models/Comment";
import {CommentService} from "../../_core/api/comment.service";
import { UserPostDetailsComponent } from 'src/app/user-post-details/user-post-details.component';
import { UserService } from 'src/app/_core/services/user.service';
import { User } from 'src/app/_core/models/User';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  userid: number;
  owner: boolean;

  constructor(private router: Router,
    private userPostDetailsComponent: UserPostDetailsComponent,
    private commentService: CommentService,
    private userService: UserService){
      this.userService.userStream.subscribe((user: User) => {
        this.userid = user.id;
    });
  }

  ngOnInit()
  {
    if(this.comment.userId == this.userid)
      this.owner = true;
    else
      this.owner = false;
  }

  goToUserProfile()
  {
    this.router.navigate(['profile/' + this.comment.userId]);
  }

  deletepCommentById(commentId : number){
    var index = this.userPostDetailsComponent.comments.findIndex(
      (comment) => this.comment.id === commentId
    );
    this.userPostDetailsComponent.comments.splice(index, 1);
}

  deleteComment() {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService
        .removeComment(this.userid.toString(), this.comment.id.toString())
        .subscribe((comment: Comment) => {
          this.deletepCommentById(comment.id);
          this.userPostDetailsComponent.getComments();
        });
    }
  }

}
