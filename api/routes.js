const router = require('express').Router();
const mongoose = require('mongoose');
const schema = require('./mongooseSchema');
require('dotenv').config();


mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
mongoose.pluralize(null);

function getTodo (req, res) {
    try {
        mongoose.model(req.user.email, schema).find({}).then(function (todo) {
            res.send(todo);
        });
    } catch (error) {
        res.send(error);
    }
}

function addTodo (req, res) {
    try {
        mongoose.model(req.user.email, schema).create(req.body).then(function (todo) {
            res.send(todo);
        });
    } catch (error) {
        res.send(error);
    }
}

function updateTodo (req, res) {
    try {
        mongoose.model(req.user.email, schema).updateOne({ _id: req.params.id }, req.body).then(function (todo) {
            res.send(todo);
        });
    } catch (error) {
        res.send(error);
    }
}

function deleteTodo (req, res) {
    try {
        mongoose.model(req.user.email, schema).deleteOne({ _id: req.params.id }).then(function (todo) {
            res.send(todo);
        });
    } catch (error) {
        res.send(error);
    }
}


//get all todos
router.get('/todo', getTodo);

//add new todos
router.post('/todo', addTodo);

//update todo
router.put('/todo/:id', updateTodo);

//delete todo
router.delete('/todo/:id', deleteTodo);

module.exports = router;

