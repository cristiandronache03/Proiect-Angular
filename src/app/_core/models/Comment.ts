export class Comment {
  id: number;
  userId: number;
  username: string;
  postid: number;
  text: string;
 
   constructor(
     id: number,
     userId: number,
     username: string,
     postid: number,
     text: string,
   ) {
     this.id = id;
     this.userId = userId;
     this.username = username;
     this.postid = postid;
     this.text = text;
   }
 }
 