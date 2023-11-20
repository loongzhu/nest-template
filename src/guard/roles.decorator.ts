import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums";

export const ROLES_KEY = "roles";

/**
 * This is the roles decorator
 * @description This decorator is used to define the roles that can access a route
 * @param roles The roles that can access a route
 * @returns The roles that can access a route
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
