const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model("Post", postSchema);