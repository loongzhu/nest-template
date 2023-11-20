import { Injectable } from "@nestjs/common";
import { Role } from "../enums";

// This should be a real class/interface representing a user entity

export type User = {
  userId: number;
  username: string;
  password: string;
  roles?: Role | Role[] | string | string[];
  token?: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: "john",
      password: "aaf54d9095399d45001e785a97159834",
      roles: ["admin"],
    },
    {
      userId: 2,
      username: "maria",
      password: "3ab7caee653bf5ef9fce8905b969e60d",
      roles: "user",
    },
    {
      userId: 3,
      username: "joker",
      password: "3ab7caee653bf5ef9fce8905b969e60d",
      roles: Role.USER,
    },
    {
      userId: 4,
      username: "jenny",
      password: "3ab7caee653bf5ef9fce8905b969e60d",
      roles: ["user", Role.ADMIN],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(user): Promise<void> {
    this.users.push({ userId: this.users.length + 1, ...user });
    console.log(this.users);
  }
}
