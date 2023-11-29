import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import type { updateUser } from "../users/users.service";
import { Public } from "./auth.decorator";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  sginIn(@Body() signInDto: Record<string, any>) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }

  @Get("profile")
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Put("modify")
  @UseGuards(AuthGuard)
  updateProfile(@Body() data: updateUser) {
    return this.authService.modifyUser(data);
  }

  @Public()
  @Post("register")
  sginUp(@Body() signInDto: Record<string, any>) {
    const { username, password } = signInDto;
    return this.authService.signUp(username, password);
  }
}
