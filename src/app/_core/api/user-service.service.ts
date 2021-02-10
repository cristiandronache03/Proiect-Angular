import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService2 {
  private readonly resourceUrl: string = "/user";
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {
  }

  getUserInfo(id:string) {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('Id', id);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}`+"/getuserbyid", {params: params, headers: headers});
  }

  searchUsers(name: string)
  {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
    .set('name', name);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + "/searchuser", {params: params, headers: headers});
  }

}
