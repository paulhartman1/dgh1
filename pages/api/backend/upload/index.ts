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

    const categoryResponse = await executeQuery({
  
      query: `INSERT INTO dgh.image_category(id_image,id_category) values ("${id}","${cats}")`,
      values: [],
    });

    if(response && categoryResponse) res.send(200)
    else res.send(500);
   

   
  } catch (err) {
    console.log(err);
  }
};
