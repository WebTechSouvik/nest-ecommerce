import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import awsConfig from "src/config/aws.config";

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    constructor(@Inject(awsConfig.KEY) private readonly awsCred: ConfigType<typeof awsConfig>) {
        this.s3Client = new S3Client({
            region: awsCred.region,
            credentials: {
                accessKeyId: awsCred.accessKeyId,
                secretAccessKey: awsCred.secretAccessKey
            }
        })
        this.bucketName = awsCred.bucketName;
    }

    async getPreSignedUrlForUploadObject(key: string, contentType: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: contentType
        })
        return await getSignedUrl(this.s3Client, command, {
            expiresIn: 300
        })

    }

}