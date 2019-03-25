var mongoose = require('mongoose');
var schema = require('./schema/index');

module.exports = {
  todoItem: mongoose.model('todoItem',schema.todoItem),
  users: mongoose.model('users',schema.users)
}