import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly resourceUrl: string = "/Comment";
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {
  }

  addComment(body) {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token)
    console.log(body);
    return this.http.post(this.baseUrl + this.resourceUrl + "/addcomment", body, {headers: headers});
  }

  removeComment(uid: string, cid: string) {
    console.log(uid + "  " + cid);
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('UserId', uid)
      .set('CommentId', cid);
    return this.http.post(this.baseUrl + this.resourceUrl + "/deletecomment", null, {params:params, headers: headers});
  }

  getComments(id: string) {
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("token", token);
    const params: HttpParams = new HttpParams()
      .set('id', id)
      return this.http.get(this.baseUrl + this.resourceUrl + "/getcomments", {params:params, headers: headers});
  }

}
