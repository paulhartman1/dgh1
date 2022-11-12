import { S3Client } from '@aws-sdk/client-s3'

const REGION = 'us-east-1'
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION,  })
//s3Client.config.credentials()
export { s3Client }