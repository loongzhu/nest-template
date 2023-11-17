import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./auth.decorator";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    console.log("~~~~~~~");

    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);

    if (!token) {
      throw new UnauthorizedException("You are not authorized");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload;
    } catch {
      throw new UnauthorizedException("You are not authorized");
    }
    return true;
  }

  private extractJwtFromRequest(request: any): string | null {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return null;
    }
    const [type, token] = authorization.split(" ") ?? [];
    return type === "Bearer" ? token : null;
  }
}

export const AppGuard = { provide: APP_GUARD, useClass: AuthGuard };
