const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema ({
    questionNumber: {
        type: Number,
    },
    name: {
        type: String,
    },
    question: {
        type: String,
    },
    inputType: {
        type: String,
    },
    input: {
        type: Array,
    }
})


const Quiz = mongoose.model('Quiz', quizSchema, 'Quiz')

module.exports = Quiz;