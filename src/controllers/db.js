var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "../db/storia.db" 
    }
  });

 async function getData( table, column, column_data){
   if(column === undefined){
    return data = {
     listings: await knex.select().from(table)
    }

    /*
   }else{
    data =  await knex.select().from(table).where(column, column_data);
    return data;
   }*/
  
   }
 }


module.exports = {
    getData
  }
