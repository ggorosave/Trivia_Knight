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

    type Query {
        categories: [Category]
        game(_id: ID!): Game
        user: User
        session(_id: ID!): Session
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!)
        
        addGame(title: String!): Game
        
        updateGameQuestions(gameId: ID!, question: String!, correct_answer: String!, incorrect_answers: [String]!, difficulty: String!, type: String!, category: ID!)

        updateUser(firstName: String, lastName: String, username: String, email: String, password: String)

        updateQuestion(gameId: ID!, question: String, correct_answer: String, incorrect_answers: [String], difficulty: String, type: String, category: ID)

        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;