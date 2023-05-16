const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Game, Session } = require("../models")
const { signToken } = require("../utils/auth");
const { populate, findOne } = require("../models/User");

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        game: async (parent, { _id }) => {
            return Game.findById(_id).populate({
                path: "questions",
                populate: "category"
            });
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: "games",
                    populate: {
                        path: "questions",
                        populate: "category"
                    }
                })

                return user;
            }
        },
        session: async (parent, { _id }) => {
            return Session.findById(_id).populate([{ path: 'host' }, { path: 'players' }])
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addGame: async (parent, { title }, context) => {
            if (context.user) {
                const game = await Game.create({ title: title });

                await User.findByIdAndUpdate(context.user._id, { $push: { games: game } });

                return game;
            }
        },
        addCategory: async (parent, { name }, context) => {
            if (context.user) {
                const category = await Category.create({ name: name });

                return category;
            }
        },
        addGameQuestion: async (parent, { gameId, question, correct_answer, incorrect_answers, difficulty, type, category }, context) => {
            if (context.user) {
                const game = await Game.findByIdAndUpdate(
                    { _id: gameId },
                    {
                        $addToSet: {
                            questions: {
                                question: question,
                                correct_answer: correct_answer,
                                incorrect_answers: [...incorrect_answers],
                                difficulty: difficulty,
                                type: type,
                                category: category
                            }
                        }
                    },
                    { new: true }
                );

                return game;
            }

            throw new AuthenticationError('You need to be logged in to update your game questions');
        },
        updateUser: async (parent, args, context) => {

            if (context.user) {

                return await User.findByIdAndUpdate(
                    context.user._id,
                    args,
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in');
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError("Username does not exist");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Username and password do not match.");
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;