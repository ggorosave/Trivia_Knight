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
        }
    }
};

module.exports = resolvers;