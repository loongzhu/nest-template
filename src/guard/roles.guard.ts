import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from ".";
import { Role } from "../enums";

/**
 * This is the roles guard
 * @description This guard is used to check if a user has the role(s) required to access a route
 * @returns A boolean indicating if a user has the role(s) required to access a route
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      // 💡 if there's no role defined, we will directly allow access
      return true;
    }

    // 💡 get the user object from the request object here
    const { user } = context.switchToHttp().getRequest();
    // 💡 check if the user has the role(s) required to access the route
    const isAllowed = this.matchRoles(roles, user.roles);
    return isAllowed;
  }

  matchRoles(roles: Role[], user: Role | Role[]): boolean {
    const userRoles = Array.isArray(user) ? user : [user];
    return roles.some((role) => userRoles.includes(role));
  }
}
