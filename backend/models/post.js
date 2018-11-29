const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, require: true }, //in node.js(javascript) 'String', in typescript 'string'
    content: { type: String, require: true }
});

module.exports = mongoose.model('Post', postSchema);
