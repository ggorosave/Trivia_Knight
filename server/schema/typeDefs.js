const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Game {
        _id: ID
        title: String
        questions: [Question]
    }

    type Question {
        _id: ID
        question: String
        correct_answer: String
        incorrect_answers: [String]
        difficulty: String
        type: String
        category: Category
    }

    type Session {
        _id: ID
        gameDate: String
        host: User
        game: Game
        players: [User]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        games: [Game]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        game(_id: ID!): Game
        user: User
        session(_id: ID!): Session
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        
        addGame(title: String!): Game

        addCategory(name: String!): Category
        
        addGameQuestion(gameId: ID!, question: String!, correct_answer: String!, incorrect_answers: [String]!, difficulty: String!, type: String!, category: ID!): Game

        updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User

        updateQuestion(gameId: ID!, questionId: ID!, question: String, correct_answer: String, incorrect_answers: [String], difficulty: String, type: String, category: ID): Game

        removeQuestion(gameId: ID!, questionId: ID!): Game

        login(username: String!, password: String!): Auth
    }
    
`;

module.exports = typeDefs;