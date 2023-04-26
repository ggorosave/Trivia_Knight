const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Game, Session } = require("../models")
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
    }
};

module.exports = resolvers;