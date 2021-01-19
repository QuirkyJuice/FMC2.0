const Joi = require('joi');

module.exports.currSchema = Joi.object({
    curriculum: Joi.object({
        name: Joi.string().required(),
        link: Joi.string().required(),
        cdreview: Joi.string().required(),
        grades: Joi.any(),
        howManyRec: Joi.number(),
        accredited: Joi.string(),
        cost: Joi.string(),
        worldview: Joi.string(),
        disabilityFriendly: Joi.string(),
        teacherInvolve: Joi.string(),
        lStyle: Joi.any(),
        cType: Joi.any(),
        recommended: Joi.any(),

    }).required()
})

module.exports.reviewSchema = Joi.object({
   review: Joi.object({
       rating: Joi.number().required(),
       body: Joi.string().required(),
   }).required()
})