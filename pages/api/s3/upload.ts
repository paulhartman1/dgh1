/* eslint-disable import/no-anonymous-default-export */
import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let { name, type } = req.body;
    console.log(name,type);
    
    const fileParams = {
      Bucket: 'dgh-storage-6e8b5fbb153419-staging',
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    
    const url = await s3.getSignedUrlPromise('putObject', fileParams);
    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
    api: {
      bodyParser: {
        sizeLimit: "8mb", // Set desired value here
      },
    },
  };
