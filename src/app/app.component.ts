import {Component,OnInit} from '@angular/core';
import {UserService} from './_core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit{

  constructor(private userService: UserService){ }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    if (token)
    {
      this.userService.setUser(JSON.parse(localStorage.getItem('currentUser')));
    }
  }

}
