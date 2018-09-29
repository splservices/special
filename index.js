const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const uuid = require('uuid');
const logger = require('./utils/logger');
const cookieParser = require('cookie-parser');
const boom = require('express-boom');
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./config/redis-connection');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');
const helmet = require('helmet');
const index = require('./routes/index');
const constant = require('./config/constant');
const app = express();

const redisOptions = {
	client: redisClient,
	no_ready_check: true,
	ttl: 600,
	logErrors: true
};

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, done)=>{
	done(null, user.id)
})

passport.use(new FacebookStrategy({
	clientID:constant.facebook.clientID,
	clientSecret:constant.facebook.clientSecret,
	callbackURL:'http://localhost:3000/api/v1/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done){
	console.log('Auth done');
	console.log(JSON.stringify(profile))
	done(null, profile)

}))


// view engine setup
logger.info(`Application bootstraping`);


app.use(express.static('client/dist/client/'))


app.use('/', index)



app.use((req, res, next)=>{
    const output = fs.readFileSync('client/dist/client/index.html')
    res.type('html').send(output);
    next();
})





module.exports = { app};