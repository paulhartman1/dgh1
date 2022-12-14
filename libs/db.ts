// @ts-nocheck

import mysql from 'serverless-mysql'


const db = mysql({
    config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
    }
})

export default async function excuteQuery({ query, values }):Promsie {
  console.log('Process ENV: ',process.env)
    try {
      const results = await db.query(query, values);
      await db.end();
      console.log(results);
      
      return results;
    } catch (err) {
        console.log(err)
      return { error: err };
    }
  }