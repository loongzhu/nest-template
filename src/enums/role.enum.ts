/**
 * All the roles in the application
 * @description This is the role enum
 */
export enum Role {
  ADMIN = "admin", // 💡 this is the role that has the highest privilege
  USER = "user", // 💡 this is the role of internal users
  MEMBER = "member", // 💡 this is the role of member users
  ORDINARY = "ordinary", // 💡 this is the role of ordinary users
  VISITOR = "visitor", // 💡 this is the role of visitors
}
