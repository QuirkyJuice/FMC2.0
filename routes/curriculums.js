const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Curriculum = require('../models/curriculum');
const { isLoggedIn, isAuthor, validateCurr } = require('../middleware.js');





router.get('/', isLoggedIn, wrapAsync(async (req, res) => {
    const curriculum = await Curriculum.find({});
    res.render('curriculum/index', { curriculum })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('curriculum/new');
})

router.post('/', isLoggedIn, validateCurr, wrapAsync(async (req, res) => {
    // if(!req.body.curriculum) throw new ExpressError('Invalid Curriculum Data', 400);
    const curriculum = new Curriculum(req.body.curriculum);
    curriculum.author = req.user._id;
    await curriculum.save();
    res.redirect(`/curriculum/${curriculum._id}`);
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const curriculum = await Curriculum.findById(req.params.id).populate('reviews');
    res.render('curriculum/profile', { curriculum });
}));


router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const curriculum = await Curriculum.findById(id);
    console.log(JSON.stringify(curriculum,0,2));
    if(!curriculum) {
        return res.redirect('/curriculum');
    }
    res.render('curriculum/edit', { curriculum });
}))

// router.get('/curriculum/:id/edit', wrapAsync(async (req, res) => {
//     const curriculum = await Curriculum.findById(req.params.id);
//     res.render('curriculum/edit', { curriculum });
// }))

router.put('/:id', isLoggedIn, isAuthor, validateCurr, wrapAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(req.body.curriculum);
    const curriculum = await Curriculum.findByIdAndUpdate(id, { ...req.body.curriculum}, {new: true});
    res.redirect(`/curriculum/${curriculum._id}`)
}))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Curriculum.findByIdAndDelete(id);
    res.redirect('/');
}))



module.exports = router;



// router.use((req, res, next) => {
//     if (req.query.isAdmin) {
//         next();
//     } else {
//         res.send ('sorry not admin')
//     }
// })