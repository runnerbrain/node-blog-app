"use strict";

const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        firstName: { type:  String, required: false},
        lastName: { type: String, required: false }
    },
    created: { type: Date, required: false}
});

blogSchema.virtual("authorString").get(function(){
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogSchema.methods.serialize = function(){
    return {
        id: this._id,
        title : this.title,
        content: this.content,
        author: this.authorString,
        created: this.created
    };
};

const Blog = mongoose.model("Post",blogSchema);

module.exports = { Blog };