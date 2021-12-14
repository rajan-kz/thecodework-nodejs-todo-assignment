const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { versionKey: false }
);

module.exports = todoSchema;
