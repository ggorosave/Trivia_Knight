const express = require('express');
const { ApolloSever } = require('apollo-server-express');
const path = require('path');
// TODO: import authMiddleware

// TODO: import typeDefs and resolvers
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// TODO: create new instance of ApolloServer with typedefs, resolvers, and context

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO: set up path to server static resources

// TODO: add code to get index.html file from build folder

// TODO: add code to use the build folder as the static folder when in production

// TODO: add start ApolloServer function