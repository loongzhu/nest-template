import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  sginIn(@Body() signInDto: Record<string, any>) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }
}
