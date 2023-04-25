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
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
    // Add type and difficulty
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;