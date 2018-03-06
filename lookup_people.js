const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user    : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

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
      callback(null, `${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate.toDateString()}`)
        if(i === people.length - 1){
          client.end()
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