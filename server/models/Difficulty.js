const mongoose = require("mongoose");

const { Schema } = mongoose;

const difficultySchema = new Schema({
    level: {
        type: String,
        required: true,
        trim: true
    }
});

const Difficulty = mongoose.model("Difficulty", difficultySchema);

module.exports = Difficulty;