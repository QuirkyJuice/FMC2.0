const ExpressError = require('./utils/ExpressError');
const { currSchema } = require('./validations');
const Curriculum = require('./models/curriculum');

module.exports.isLoggedIn = (req, res, next) => {

if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    return res.redirect('/login');
}
next();
}

module.exports.validateCurr = (req, res, next) => {
    const { error } = currSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)  
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const curriculum = await Curriculum.findById(id);
    if (!curriculum.author.equals(req.user._id)) {
        return res.redirect(`/curriculum/${id}`);
    }
    next ();
}