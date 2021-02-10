import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from 'src/app/_core/models/User';
import {UserPostsService} from "../../_core/api/user-posts.service";
import {UserService} from '../../_core/services/user.service';
import {UserPostsFilters, UserPost} from "../../_core/models/UserPost";
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less'],
})
export class FeedComponent implements OnInit{
  userPosts: UserPost[] = [];
  postForm: FormGroup;
  userid: number;
  username: string;
  loading = true;
  filters: UserPostsFilters = new UserPostsFilters(1, 2);

  constructor(
    private userPostsService: UserPostsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {
    this.userService.userStream.subscribe((user: User) => {
        this.userid = user.id;
        this.username = user.firstName + " " + user.lastName;
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.getUserPosts();
  }

  getUserPosts() {
    this.loading = true;
    this.userPostsService.getUserPosts(this.userid.toString(), this.filters).subscribe(
      (userPosts: UserPost[]) => {
        this.userPosts = userPosts;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  showMore() {
    this.filters.page++;
    this.getUserPosts();
  }

  back() {
    this.filters.page--;
    this.getUserPosts();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: [null],
      text: [null],
      ImgUrl: "",
      username: this.username,
      userid: this.userid
    });
  }

  getTitle()
  {
    return this.postForm.get("title");
  }

  getText()
  {
    return this.postForm.get("text");
  }

  getImgUrl()
  {
    return this.postForm.get("ImgUrl");
  }

  getUserId()
  {
    return this.postForm.get("userid");
  }

  getUsername()
  {
    return this.postForm.get("username");
  }

  addPost() {
    if (this.postForm.invalid) {
      return;
    }
   this.userPostsService.addUserPost(this.postForm.value).subscribe(
     (userPosts: UserPost) => {
    this.userPosts.push(userPosts);
    },
  (error) => {
    console.error(error);
    this.loading = false;
  });
  }

}
