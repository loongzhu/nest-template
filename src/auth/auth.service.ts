import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as md5 from "crypto-js/md5";
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

    const { password, ...result } = user;
    console.log("🚀 ~ password:", password);

    // TODO: Generate a JWT and return it here
    // instead of the user object

    const payload = { sub: user.userId, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

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
}

const privateKey = "privateKey";

async function encrypt(password: string): string {
  const pass = await md5(password + privateKey).toString();
  return pass;
}

async function decrypt(input: string, password: string): boolean {
  const pass = await encrypt(input);
  return pass !== password;
}
