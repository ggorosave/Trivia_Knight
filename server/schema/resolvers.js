const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Game, Session } = require("../models")
const { signToken } = require("../utils/auth");
const { populate } = require("../models/User");

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        game: async (parent, { _id }) => {
            return Game.findById(_id).populate("questions")
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: "games",
                    populate: "questions"
                })
            }

            return user;
        },
        session: async (parent, { _id }) => {
            return Session.findById(_id).populate([{path: 'host'}, {path: 'players'}])
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        
    }
};

module.exports = resolvers;