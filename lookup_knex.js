const config = require ('./knex-connection.js')
const knex = require("knex")(config)

function findPersonByName (people, callback){
  knex('famous_people')
  .where({first_name: people})
  .orWhere({last_name: people})
    .then( results => {
      callback(null, results)
    })
    .catch( (err) => {
      throw err
    })
}



findPersonByName(process.argv[2], (err, results) => {
  for(let row of results){
    console.log(`${row.first_name} ${row.last_name}, born ${row.birthdate.toDateString()}`)
  }
  knex.destroy()
})