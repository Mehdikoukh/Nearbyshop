var express          = require('express'),
	mongoose         = require('mongoose'),
	path             = require('path'),
	bodyParser       = require('body-parser'),
	cors             = require('cors'),
	expressValidator = require('express-validator'),
	session          = require('express-session'),
	passport         = require('passport'),
	config           = require('./config/database'),
	LocalStrategy    = require('passport-local').Strategy
	User             = require('./models/schemauser'),
	config           = require('./config/database'),
	bcrypt           = require('bcryptjs');
	
mongoose.connection.openUri(config.database, {
  keepAlive: 120
});
	
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(cors())

app.use(session({
  secret: 'may the force be with you',
  resave: true,
  saveUninitialized: true
}));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done){
    let query = {email:email};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'user not found'});
      };
 
	bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});
//==========
//ROUTES
//==========
let homepage = require('./routes/homepage');
let users = require('./routes/users');
app.use('/users', users);
app.use('/homepage', homepage);


    app.listen(8081)
    console.log(`Server started on port 8081`)