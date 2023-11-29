import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as md5 from "crypto-js/md5";
import type { updateUser } from "../users/users.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (await decrypt(pass, user?.password)) {
      throw new UnauthorizedException("Wrong password");
    }

    const { password, token, ...result } = user;
    console.log(password, token);

    // TODO: Generate a JWT and return it here
    // instead of the user object

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    const access_token = await this.jwtService.signAsync(payload);

    await this.usersService.updateToken({ username, token: access_token });

    return { ...result, access_token };
  }

  async signUp(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user) {
      throw new UnauthorizedException("User already exists");
    }

    const password = await encrypt(pass);

    return this.usersService.create({ username, password });
  }

  async modifyUser(user: updateUser): Promise<any> {
    const { username, password: pass } = user;
    if (!username) {
      throw new UnauthorizedException("Username is required");
    }

    const found = await this.usersService.findOne(username);
    if (!found) {
      throw new UnauthorizedException("User not found");
    }

    if (!pass) {
      throw new UnauthorizedException("Password is required");
    }
    const password = await encrypt(pass);

    return this.usersService.update({ username, password } as updateUser);
  }
}

const privateKey = "privateKey";

async function encrypt(password: string): Promise<string> {
  const pass = await md5(password + privateKey).toString();
  return pass;
}

async function decrypt(input: string, password: string): Promise<boolean> {
  const pass = await encrypt(input);
  return pass !== password;
}
