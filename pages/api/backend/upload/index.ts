//@ts-ignore
/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../../libs/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let { id, displayName, display,description, cats } = req.body;

    const response = await executeQuery({
      query: `INSERT INTO dgh.images(id,displayName,display, description) values ("${id}","${displayName}",${display},"${description}")`,
      values: [],
    });

    if(response) res.send(200)
    else res.send(500);
   

   
  } catch (error) {
    console.log(error);
  }
};
