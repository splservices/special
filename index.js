const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const boom = require('express-boom');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();


app.get('/', (req, res)=>{
    res.send({message:'Hello World'})
})





module.exports = { app};