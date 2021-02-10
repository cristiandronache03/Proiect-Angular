import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../../_core/services/user.service';
import {UserService2} from '../../_core/api/user-service.service';
import {UpdateData, User} from "../../_core/models/User";
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'src/app/_core/api/account.service';
import {UserPost} from 'src/app/_core/models/UserPost';
import {UserPostsService} from 'src/app/_core/api/user-posts.service';
import {FollowService} from 'src/app/_core/api/follow.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  uid: string;
  gender: string;
  userage: string;
  image: string;
  defaultimage: string;
  userPosts: UserPost[] = [];
  owner: boolean;
  loggedid: string;
  updateForm: FormGroup;
  showAlert: boolean = false;
  showUpdateInfo: boolean = false;
  submitPressed: boolean = false;
  displayImage: boolean = true;
  buttonStatus: boolean;

  constructor(private userService: UserService,
    private userService2 : UserService2,
    private userPostsService: UserPostsService,
    private accountService: AccountService,
    private followService: FollowService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute)
    {

    }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.uid = routeParams.id;
      this.getCurrentUser();
      this.getProfileInfo();
      this.getUserPosts();
      this.getButtonStatus();
  });
  }

getProfileInfo(){
  this.userService2.getUserInfo(this.uid).subscribe(
    (res: User) => {
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.gender = res.gender;
      if(res.profilePic!=null)
        this.image = res.profilePic;
      else
        this.image = "/assets/user.png";
      if(res.age!='0')
        this.userage = res.age;
      else
        this.userage = "";
    }
  )
}

  getCurrentUser(){
    this.userService.userStream.subscribe((user: User) => {
      this.loggedid = user.id.toString();
      this.defaultimage = user.profilePic;
      if(user.id.toString() == this.uid)
        this.owner = true;
      else
        this.owner = false;
   });
  }

  getUserPosts() {
    this.userPostsService.getUserPostsById(this.uid).subscribe(
      (userPosts: UserPost[]) => {
        this.userPosts = userPosts;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getButtonStatus(){
    this.followService.getFollowStatus(this.loggedid,this.uid).subscribe(
      (response: any) => {
        var string = response.message;
        if(string == "isFollowed"){
          this.buttonStatus = true;
        }
        else{
          this.buttonStatus = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  followuser()
  {
   this.followService.follow(this.loggedid,this.uid).subscribe(
      (response: any) => {
        var string = response.message;
        if(string == "isFollowed"){
          this.buttonStatus = true;
        }
        else{
          this.buttonStatus = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createForm(): void {
    this.updateForm = this.formBuilder.group({
      profileImage: [this.defaultimage],
      age: [null, [Validators.pattern("^[0-9]*$")]],
    });
  }

  get profileImage(): AbstractControl {
    return this.updateForm.get('profileImage');
  }

  get age(): AbstractControl {
    return this.updateForm.get('age');
  }

  get password(): AbstractControl {
    return this.updateForm.get('password');
  }


 submit()
 {
    if (this.updateForm.invalid) {
      return;
    }

    const updateData: UpdateData = new UpdateData(
      this.loggedid,
      this.profileImage.value,
      this.age.value
    );

    this.accountService.update(updateData);
    this.showUpdateInfo = false;
    var newuser = JSON.parse(localStorage.getItem('currentUser'));
    newuser.profilePic = this.profileImage.value;
    newuser.age = this.age.value;
    localStorage.setItem("currentUser",JSON.stringify(newuser));
    this.ngOnInit();
  }

  show()
  {
    this.showUpdateInfo = true;
    this.createForm();
  }

  cancel()
  {
    this.showUpdateInfo = false;
  }
}
