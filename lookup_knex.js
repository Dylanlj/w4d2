const settings = require("./settings");
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


function findPersonByName (client, people, callback){
  const query = 
  `SELECT * 
  FROM famous_people 
  where first_name = $1
  or last_name = $1;`

function findPersonByName (client, people, callback){
  const query = 
  `SELECT * 
  FROM famous_people 
  where first_name = $1
  or last_name = $1;`

  for(let i = 0;  i < people.length; i++){
    client.query (query, [people[i]], (err, result) => {
      if (err) {
        console.error(err)
        callback (err)
        return
      }
     for(let p = 0; p < result.rows.length; p++){
        callback(null, `${result.rows[p].first_name} ${result.rows[p].last_name}, born ${result.rows[p].birthdate.toDateString()}`)
          if(i === people.length - 1){
            client.end()
          }
        }
      }
    );
  }
}

client.connect((err) => {
  if (err){
    return console.error("Connection Error", err);
  }
  findPersonByName(client, process.argv.slice(2), (err, result) => {
    console.log(result)
  })
})