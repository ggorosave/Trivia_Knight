const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schema")
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO: set up path to server static resources (uncomment below)
// app.use('/images', express.static(path.join(__dirname, '../client/images')));

// TODO: add code to get index.html file from build folder
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }

// TODO: add code to use the build folder as the static folder when in production
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);