const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env
import AWS from 'aws-sdk';

export const s3 = new AWS.S3({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: AWS_REGION });