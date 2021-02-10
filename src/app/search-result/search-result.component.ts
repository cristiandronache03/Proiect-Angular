import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService2} from '../_core/api/user-service.service';
import {User} from '../_core/models/User';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

  name: string;
  users: User[];

  constructor( private activatedRoute: ActivatedRoute,
    private userService: UserService2, ) {}

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(routeParams => {
      this.name = routeParams.name;

    this.name = this.activatedRoute.snapshot.params.name;
    this.userService.searchUsers(this.name).subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
      );

  });

  }
}
