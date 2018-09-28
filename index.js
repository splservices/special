const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const boom = require('express-boom');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();


app.use(express.static('client/dist/client/'))

app.use((req, res, next)=>{
    const output = fs.readFileSync('client/dist/client/index.html')
    res.type('html').send(output);
    next();
})




module.exports = { app};