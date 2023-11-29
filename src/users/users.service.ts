import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { Role } from "../enums";

// This should be a real class/interface representing a user entity

// export type User = {
//   userId: number;
//   username: string;
//   password: string;
//   roles?: Role | Role[] | string | string[];
//   token?: string;
// };

export type updateUser = Omit<User, "id"> &
  Partial<Pick<User, "roles" | "token">>;

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly users = [
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

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async findOne(username): Promise<User | null> {
    // const user = this.users.find((user) => user.username === username);
    if (!username) return null;
    const where: Prisma.UserWhereUniqueInput = { username };
    const user = await this.user.findUnique({ where });
    return user;
  }

  async create(user: Prisma.UserCreateInput): Promise<void> {
    // this.users.push({ userId: this.users.length + 1, ...user });
    await this.user.create({ data: user });
  }

  async update(user: updateUser): Promise<void> {
    const { username, password } = user;
    await this.user.update({ where: { username }, data: { password } });
  }

  async updateToken({
    username,
    token,
  }: {
    [key: string]: string;
  }): Promise<void> {
    await this.user.update({ where: { username }, data: { token } });
  }
}
