import { User } from "../../entities/user.entity";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  status: number;
  message: object;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserReposiory {
  save: (user: Partial<User>) => Promise<User>;
  findAll: () => Promise<User[]>;
  findOne: (userInfo: object) => Promise<User>;
}
