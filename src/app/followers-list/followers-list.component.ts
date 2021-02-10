import { Component, OnInit } from '@angular/core';
import { FollowService } from '../_core/api/follow.service';
import { User } from '../_core/models/User';
import { UserService } from '../_core/services/user.service';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.less']
})
export class FollowersListComponent implements OnInit {

  users : User[];
  loggedid : number;

  constructor(private followService: FollowService,
  private userService: UserService,)
  {
    this.userService.userStream.subscribe((user: User) => {
      this.loggedid = user.id;
  });

  this.followService.getfollowers(this.loggedid.toString()).subscribe(
    (users: User[]) => {
      this.users = users;
    },
    (error) => {
      console.error(error);
    }
   );
   }

  ngOnInit(): void {}

}
