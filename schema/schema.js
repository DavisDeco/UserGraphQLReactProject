/*this file contains all the knowledge to tell the graphql how 
 database objects and data looks like and their relationships
*/

//import lodash- it helps to walk through static collection of data
/*
const _ = require('lodash');
*/

//import the graphql library
const graphql = require('graphql');

//import axios to use when querying data from db
const axios = require ('axios');



//Get some of the properties in graphql
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema    
} = graphql;

//lets make a static hardcoded list of users for practice with lodash
/*const users = [
    {id: '23', firstname: 'Davis', age:26},
    {id: '20', firstname: 'John', age:18}

];
*/

/*create a new company object to instract graphql
 how our user object table looks like in DB 
*/

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    }
});



/*create a new user object to instract graphql
 how our user object table looks like in DB 
*/
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString } ,
        firstname: {type: GraphQLString } ,
        age: {type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
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
                //find a user from the static collection list we created above 
                //return _.find(users,{id: args.id});

                //find user from a server using axios
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

//pass our rootquery to the graphqlschema and make it apply across the project
module.exports = new GraphQLSchema({
    query:RootQuery
});
