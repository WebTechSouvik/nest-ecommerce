import { registerAs } from "@nestjs/config";

export default registerAs('aws', () => ({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'default',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'default',
    region: process.env.AWS_REGION || 'default',
    bucketName: process.env.AWS_BUCKET_NAME || 'default'
}))