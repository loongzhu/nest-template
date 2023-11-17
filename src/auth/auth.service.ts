import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }

    console.log("🚀 ~ user:", user);

    const { password, ...result } = user;
    console.log("🚀 ~ password:", password);
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
