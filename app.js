var cors = require('cors');
var consts = require('./consts');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var index = require('./routes/index');
var client = require('./routes/clients');

var app = express();
var mongoClien = mongodb.MongoClient;


app.use(function (req, res, next) {
    
  // Website you wish to allow to connect
  res.setHeader(WEBSITE_ALLOW_CONNECT_NAME, WEBSITE_ALLOW_CONNECT_VALUE);

  // Request methods you wish to allow
  res.setHeader(REQUEST_ALLOW_METHODS_NAME, REQUEST_ALLOW_METHODS_VALUE);

  // Request headers you wish to allow
  res.setHeader(REQUEST_ALLOW_HEADERS_NAME, REQUEST_ALLOW_HEADERS_VALUE);

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader(REQUEST_ALLOW_COOKIES_NAME, true);

  // Pass to next layer of middleware
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(LOGIN_URL, index);
app.use(CLIENT_URL, client);

app.get(CLIENT_RETRIEVE_URL, function (req, res) {
  mongoClien.connect(CONNECT_MONGODB_URL, function(err, db) {
      if (err) throw err;
      
      var dbo = db.db(DBNAME_ADMIN);
      
      dbo.collection(COLLECTION_USERS).find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return res.send(result);
      });
    
  });
});

app.post(CLIENT_CREATE_URL, function (req, res) {
  mongoClien.connect(CONNECT_MONGODB_URL, function(err, db) {
      if (err) throw err;

      var dbo = db.db(DBNAME_ADMIN);
      var user = { name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address };
      
      dbo.collection(COLLECTION_USERS).insertOne(user, function(err, res) {
        if (err) throw err;
        db.close();
      });
  
  });
  res.send('Add Client');
});

app.put(CLIENT_UPDATE_URL, function (req, res) {
  mongoClien.connect(CONNECT_MONGODB_URL, function(err, db) {
      if (err) throw err;
      
      var dbo = db.db(DBNAME_ADMIN);
      var myquery = { name: "eulises" };
      var newvalues = { $set: {name: "Elias de jesus", picture: "Elias de jesus's picture" } };
      
      dbo.collection(COLLECTION_USERS).updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        db.close();
      });
    
  });
  res.send('Update Client');
});

app.delete(CLIENT_DELETE_URL, function (req, res) {
  mongoClien.connect(CONNECT_MONGODB_URL, function(err, db) {
      if (err) throw err;

      var dbo = db.db(DBNAME_ADMIN);
      var myquery = { name: "Elias de jesus" };
      
      dbo.collection(COLLECTION_USERS).deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        db.close();
      });
  
  });
  res.send('Delete Client');
});

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_API_KEY,
  clientSecret: FACEBOOK_API_SECRET,
  callbackURL: FACEBOOK_CALBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    //Check whether the User exists or not using profile.id
    //Further DB code.
    return done(null, profile);
  });
}
));

app.get(LOGIN_FACEBOOK, passport.authenticate('facebook'));
app.get(LOGIN_FACEBOOK_CALLBACK,
passport.authenticate('facebook', { 
     successRedirect : CLIENT_URL, 
     failureRedirect: LOGIN_URL 
}),
function(req, res) {
  res.redirect(CLIENT_URL);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
