// @ts-nocheck

import mysql from 'mysql2';

export default async function excuteQuery(query): Promise {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    insecureAuth: true
  });
  try {
    
    db.connect();
    db.query(query, function(error, results, fields) {
     if(error) console.log('ERRORRRRRRRRRRRRR',error);
     console.log('RESULT:::::::',results);
      
    });
    db.end();
   // console.log(results);

    return result;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
