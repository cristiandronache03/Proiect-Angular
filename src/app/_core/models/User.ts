export class RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }
}

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string,
    public profilePic: string,
    public age: string,
    public passwordHash: string
  ) {
  }
}

export interface LoginResponse {
  token: string;
  user: User;
}

export class UpdateData {
  id: string;
  profilePic: string;
  age: string;

  constructor(
    id: string,
    profilePic: string,
    age: string
  ) {
    this.id = id;
    this.profilePic = profilePic
    this.age = age;
  }
}
