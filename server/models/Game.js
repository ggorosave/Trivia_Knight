const mongoose = require("mongoose");
const questionSchema = require("./Question")

const { Schema } = mongoose;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    questions: [questionSchema]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;