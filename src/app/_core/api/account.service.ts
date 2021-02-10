import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly resourceUrl: string = "/Account";
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {
  }

  register(body) {
    return this.http.post(this.baseUrl + this.resourceUrl + "/Register", body);
  }

  login(body) {
    return this.http.post(this.baseUrl + this.resourceUrl + "/Login", body);
  }

  update(body) {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    return this.http.post(this.baseUrl + this.resourceUrl + "/updateinfo", body, {headers: headers});
  }
}
