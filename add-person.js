const config = require ('./knex-connection.js')
const knex = require("knex")(config)

function addPerson (people, callback){
console.log(people)
  knex('famous_people').insert([
    {
    first_name: people[0],
    last_name: people[1],
    birthdate: people[2]}
  ])
  .then(function(){
    knex.destroy()
  })
  .catch(function(error){
    console.error(error)
  });

}

addPerson(process.argv.slice(2) )
  
