import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private readonly resourceUrl: string = "/follow";
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {
  }

  follow(id1: string, id2: string) {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('id1', id1)
      .set('id2', id2);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + "/followuser", null, {params: params, headers: headers});
  }

  getfollowers(id: string) {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('id', id);
      return this.http.get(`${this.baseUrl}${this.resourceUrl}` + "/getfollowers", {params: params, headers: headers});
  }

  getFollowStatus(id1: string, id2: string){
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('id1', id1)
      .set('id2', id2);
      return this.http.get(`${this.baseUrl}${this.resourceUrl}` + "/getfollowstatus", {params: params, headers: headers});
  }

}
