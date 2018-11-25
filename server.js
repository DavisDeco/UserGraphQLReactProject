//Hook express to our project-it handles incoming HTTP request and outgoing responses
const express = require('express');

/*ook express-graphql- is a compatibility layer between Express and GraphQL
 that links communication between the two
*/ 
const expressGraphQL = require('express-graphql');

//import the schema.js
const schema = require('./schema/schema');

//create an express app
const app = express();

//handle all incoming requests that need to use
//Graphql through the express app
app.use('/graphql',expressGraphQL({
    schema,
    graphiql:true
}));

//Make our created express app listen on a particular port
app.listen(4000,()=>{
    console.log('Listening');

});