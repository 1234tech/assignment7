var express = require('express');
var path = require('path');
var url = require('url');
var indexRouter = require('./routes/index');
//var inventoryRouter = require('./routes/inventory');
var apiRouter = require('./routes/api/apifood');
var bodyparser = require('body-parser');
var mongoose =require('mongoose');
require('dotenv').config();
var app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@mongodb-atlas-kfx64.mongodb.net/${process.env.DB_CONNECTION}?retryWrites=true`);

var db = mongoose.connection;

db.on('open', function(){
  console.log("connected to database");
}).catch((err)=>{console.error(`${err} There is an error!`)});

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// routers
//app.use('/', indexRouter);
//app.use('/inventory', inventoryRouter);
app.use('/apifood', apiRouter);
app.use('/', express.static('../client/FoodInventoryApp/dist/FoodInventoryApp'));

module.exports = app;
