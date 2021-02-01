const express =  require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');
const shortroute = require('./routes/posts');
const authroute = require('./routes/auth');
const mylinks = require('./routes/mylinks');
const available = require('./routes/available');
const bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/available',available);
app.use('/auth',authroute);
app.use('/mylinks',mylinks);
app.use('/',shortroute);
app.get('*',function(req, res){
  res.status(400).send('Sorry this Page does not excist');
});
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true },() =>{
});

app.listen(process.env.PORT || 3000);
