import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserPostsFilters} from "../models/UserPost";


@Injectable({
  providedIn: 'root'
})
export class UserPostsService {
  private readonly resourceUrl: string = "/post";
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {
  }

  getUserPosts(id: string, filters: UserPostsFilters)
  {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('Id', id)
      .set('pageSize', filters.size.toString())
      .set('pageNumber', filters.page.toString())
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + "/getposts", {params: params, headers: headers});
  }

  getUserPostsById(id: string)
  {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('Id', id);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + "/getpostsbyid", {params: params, headers: headers});
  }

  getUserPost(id: string)
  {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('Id', id);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + "/getpost", {params: params, headers: headers});
  }

  addUserPost(body)
  {
    console.log(body);
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + "/addpost", body,{headers:headers});
  }

  deletePost(uid: string, pid: string)
  {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('UserId', uid)
      .set('PostId', pid);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + "/deletepost", null, {params: params, headers: headers});
  }

  likePost(pid: string, uid: string)
  {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('UserId', uid)
      .set('PostId', pid);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + "/likepost", null, {params: params, headers: headers});
  }

}
