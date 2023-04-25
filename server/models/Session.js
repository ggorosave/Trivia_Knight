const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionSchema = new Schema({
    gameDate: {
        type: Date,
        default: Date.now
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;

