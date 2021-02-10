import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_core/api/account.service';
import { User } from 'src/app/_core/models/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  username: string;
  age: string;
  gender: string;
  image: string;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.username = this.user.firstName + " " + this.user.lastName;
    if(this.user.profilePic!=null)
      this.image = this.user.profilePic;
    else
      this.image = "/assets/user.png";
    this.gender = this.user.gender;
    if(this.user.age!='0')
      this.age = this.user.age;
    else
      this.age = "";
  }

  goToUser()
  {
    this.router.navigate(['profile/' + this.user.id]);
  }

}
