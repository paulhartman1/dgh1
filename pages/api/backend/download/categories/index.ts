//@ts-ignore
/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../../../libs/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('trying...')
    const currentCats = await executeQuery({
      query: 'select * from dgh.categories',
      values: [],
    })
    // const currentCats = ['a','b'];
    

   console.log('currentCATS', currentCats);
   if (currentCats) res.status(200).send(['a','b']);
   else res.send(500);
  } catch (error) {
    console.log('there was an error')
    console.log(error);
  }
};
