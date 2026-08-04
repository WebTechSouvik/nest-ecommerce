import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "src/config/jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(jwtConfig.KEY) private readonly jwtConfigValue: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfigValue.access.secret
        })
    }
    validate(payload: any): unknown {
        return payload;
    }
}