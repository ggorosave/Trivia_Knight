const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    incorrect_answers: {
        type: [String]
    },
    difficulty: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
});

module.exports = questionSchema;