import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  userStream: Observable<User> = this.userSubject.asObservable();

  constructor() {
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.userSubject.asObservable();
 }
}
