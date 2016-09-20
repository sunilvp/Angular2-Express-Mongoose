var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    priority: String,
    topic: String,
    summary: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;