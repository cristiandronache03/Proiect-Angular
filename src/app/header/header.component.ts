import {Component, OnInit} from '@angular/core';
import {UserService} from '../_core/services/user.service';
import {User} from "../_core/models/User";
import { ActivatedRoute, Router } from '@angular/router';

declare var require: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  token: string;
  firstName: string;
  isLoggedIn: boolean;
  searchedname: string;
  uid: string;
  imgUrl: string;

  constructor(private userService: UserService,
    private router: Router) {
    this.userService.userStream.subscribe((user: User) => {
      if(user!=null)
      {
        this.isLoggedIn = true;
        this.firstName = user.firstName;
        this.uid = user.id.toString();
        this.imgUrl = user.profilePic;
      }
      else
      {
        this.isLoggedIn = false;
        this.firstName = null;
      }
    });
  }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
  }
  goToProfile(): void{
    this.router.navigate(['profile/' + this.uid]);
  }

  logOut(): void{
    sessionStorage.clear();
    localStorage.clear();
    this.isLoggedIn = false;
  }

  getVal(val)
  {
    this.searchedname = val;
  }

  goToSearch(): void{
    var replaceall = require("replaceall");
    this.searchedname=replaceall(" ", "+", this.searchedname);
    this.router.navigate(['search-result/' + this.searchedname]);
  }

}
