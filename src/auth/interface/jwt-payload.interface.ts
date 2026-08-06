import { UserRole } from "src/users/enum/user-role.enum";

export interface JwtPayload {
    sub: string,
    role: UserRole
}