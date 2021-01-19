const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const CurriculumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    cdreview: {
        type: String,
    },
    grades: [{
        type: String,
        enum: ['prek', 'k', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    }],
    howManyRec: {
        type: Number
    },
    accredited: {
        type: String,
        enum: ['Yes', 'No']
    }, 
    cost: {
        type: String, 
        enum: ['$', '$$', '$$$', '$$$$']
    }, 
    worldview: {
        type: String,
        enum: ['Christian', 'Secular', 'Mennonite']
    }, 
    disabilityFriendly: {
        type: String,
        enum: ['Yes', 'No']
    }, 
    teacherInvolve: {
        type: String,
        enum: ['Low', 'Mid', 'High']
    }, 
    lStyle: [{
        type: String,
        enum: ['V', 'A', 'K']
    }],
    cType: [{
        type: String,
        enum: ['U', 'P', 'A', 'S']
    }],
    recommended: [{
        type: String,
        enum: ['A', 'LA', 'M', 'S', 'Sp', 'H', 'P', 'C', 'G', 'Ar', 'B', 'Fr']
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

    
})


CurriculumSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Curriculum', CurriculumSchema, 'Curriculum');