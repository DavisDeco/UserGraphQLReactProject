/*this file contains all the knowledge to tell the graphql how 
 database objects and data looks like and their relationships
*/

//import the graphql library
const graphql = require('graphql');

//import lodash- it helps to walk through collection of data
const _ = require('lodash');

//Get some of the properties in graphql
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema    
} = graphql;

//lets make a hardcoded list of users for practice
//otherwise a db is the best
const users = [
    {id: '23', firstname: 'Davis', age:26},
    {id: '20', firstname: 'John', age:18}

];

/*create a new object to instract graphql
 how our user object table looks like in DB 
*/
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString } ,
        firstname: {type: GraphQLString } ,
        age: {type: GraphQLInt }
    }
});

/*create a rootquery that will be the entry point for 
grapghql to start querying data
*/
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue,args){
                //find a user from the collection list we created above or rather DB
                return _.find(users,{id: args.id});
                
            }
        }
    }
});

//pass our rootquery to the graphqlschema and make it apply across the project
module.exports = new GraphQLSchema({
    query:RootQuery
});
