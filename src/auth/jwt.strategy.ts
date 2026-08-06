import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "src/config/jwt.config";
import { JwtPayload } from "./interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(jwtConfig.KEY) private readonly jwtConfigValue: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfigValue.access.secret
        })
    }
    validate(payload: JwtPayload): unknown {
        return {
            id:payload.sub,
            role:payload.role
        };
    }
}