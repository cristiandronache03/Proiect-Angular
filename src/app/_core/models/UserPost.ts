export class UserPost {
  title: string;
  text: string;
  username: string;
  id: number;
  userId: number;
  imgUrl: string;
  likes: number;

  constructor(
    id: number,
    username: string,
    title: string,
    text: string,
    imgUrl: string,
    userId: number,
    likes: number
  ) {
    this.id = id;
    this.username = username;
    this.text = text;
    this.title = title;
    this.likes = likes;
    this.imgUrl = imgUrl;
    this.userId = userId;
  }
}

export class UserPostsFilters {
  page: number;
  size: number;

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;
  }
}

export interface PostResponse {
  id: number;
  title: string;
  text: string;
  userId: number;
  imgUrl: string;
  likes: number;
}
