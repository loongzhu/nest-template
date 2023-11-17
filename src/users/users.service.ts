import { Injectable } from "@nestjs/common";

// This should be a real class/interface representing a user entity

export type User = {
  userId: number;
  username: string;
  password: string;
  token?: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: "john",
      password: "changeme",
    },
    {
      userId: 2,
      username: "maria",
      password: "guess",
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
