import { registerAs } from "@nestjs/config";


export default registerAs('jwt', () => ({
    access: {
        secret: process.env.JWT_ACCESS_SECRET || 'default',
        expiry: process.env.JWT_ACCESS_EXPAIRY ?? '1h'
    },
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET || 'default',
        expiry: process.env.JWT_REFRESH_EXPAIRY ?? '7d'
    }
}))