// Import the required AWS SDK clients and commands for Node.js


import { uuid as v4 } from 'uuidv4';
import AWS from 'aws-sdk'


const upload = async (file: Blob, uuid?: string) => {

  const s3 = new AWS.S3()
  AWS.config.update({accessKeyId:'AKIAXMN5FBKXJ6ZSMMMT', secretAccessKey: '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'})
 
  const url = s3.getSignedUrl('putObject',{
    Bucket: 'dgh-storage-6e8b5fbb153419-stagingInfo',
    Key: uuid ? uuid : v4(),
    Expires: 3600,
  })

  console.log(url);
  
};

export default upload