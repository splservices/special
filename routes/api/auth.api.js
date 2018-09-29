const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/facebook' , passport.authenticate('facebook'), (req, res)=>{
    res.send('logging with facebooook')
})

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect:'/home',
    failureRedirect:'/login'
}), (req, res)=>{
    console.log('you reached at callback uri')
})

module.exports = router;