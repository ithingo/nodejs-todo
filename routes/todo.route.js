const express = require('express');
const todoRoute = express.Router();

const Todo = require('../models/todo');

// add todo
todoRoute.route('/new').post((req, res, next) => {
  Todo.create(req.body, (err, data) => {
    if (err) { return next(err); }
    else { res.json(data); };
  });
});

// get all todos
todoRoute.route('/todos').get((req, res) => {
  Todo.find((err, data) => {
    if (err) { return next(err); }
    else { res.json(data); };
  });
});

// get selected todo
todoRoute.route('/todos/:id').get((req, res) => {
  Todo.findById(req.params.id, (err, data) => {
    if (err) { return next(err); }
    else { res.json(data); };
  });
});

// update selected todo
todoRoute.route('/update-todo/:id').put((req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
    if (err) { return next(err); }
    else { res.json(data); };
  });
});

// update selected Todo
todoRoute.route('/delete-todo/:id').delete((req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) { return next(err); }
    else { res.status(200).json({ msg: data }); };
  });
});

module.exports = todoRoute;