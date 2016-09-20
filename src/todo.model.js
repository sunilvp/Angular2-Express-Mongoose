var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    Priority: String,
    Topic: String,
    Summary: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;