import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPostsService } from '../_core/api/user-posts.service';
import { UserPost } from '../_core/models/UserPost';
import { CommentService } from '../_core/api/comment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_core/services/user.service';
import { User } from '../_core/models/User';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-post-details',
  templateUrl: './user-post-details.component.html',
  styleUrls: ['./user-post-details.component.less'],
})
export class UserPostDetailsComponent implements OnInit {
  id: string;
  uid: number;
  name: string;
  userPost: UserPost;
  comments: Comment[];
  commentForm: FormGroup;
  owner: boolean;
  showImage: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userPostsService: UserPostsService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getPost().then((data) => (this.userPost = data as UserPost));
    this.createForm();
    this.getComments();
  }

  getUser() {
    this.userService.userStream.subscribe((user: User) => {
      this.uid = user.id;
      this.name = user.firstName + ' ' + user.lastName;
    });
  }

  getPost() {
    this.id = this.activatedRoute.snapshot.params.id;
    return this.userPostsService.getUserPost(this.id.toString()).toPromise();
  }

  getComments() {
    this.commentService.getComments(this.id.toString()).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateUrl() {
    this.showImage = false;
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      userId: this.uid,
      username: this.name,
      postId: Number(this.id),
      text: [''],
    });
  }

  getUserId() {
    return this.commentForm.get('userid');
  }

  getPostId() {
    return this.commentForm.get('postId');
  }

  getText() {
    return this.commentForm.get('text');
  }

  getUsername() {
    return this.commentForm.get('username');
  }

  submit() {
    this.commentService.addComment(this.commentForm.value).subscribe(
      (comm: Comment[]) => {
        this.comments.push(this.commentForm.value);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
