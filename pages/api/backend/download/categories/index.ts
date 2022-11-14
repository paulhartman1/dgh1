//@ts-ignore
/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../../../libs/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const currentCats = await executeQuery({
      query: 'SELECT id, displayName FROM dgh.categories',
      values: [],
    })
     
    
    console.log('currentCats', currentCats);
    if (currentCats) res.status(200).send(currentCats);
    else res.send(500);
  } catch (error) {
    console.log(error);
  }
};
