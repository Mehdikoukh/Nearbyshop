var express   = require('express'),
	router    = express.Router(),
	bcrypt    = require('bcryptjs'),
	passport  = require('passport'),
	crypto    = require('crypto')


let User = require('../models/schemauser');
//------------------
//Register
//------------------
router.post('/register', function(req, res){
  
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.repassword;

  req.checkBody('email', 'Empty').notEmpty();
  req.checkBody('email', 'Wrong Password').isEmail();
  req.checkBody('password', 'Empty').notEmpty();
  req.checkBody('newpassword', 'Wrong Password').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    console.log(errors);
    return res.send({error: errors})
  } else {
    let newUser = new User({
      email:email,
      password:password,
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return res.send({error: 'Error'})
            return;
          } else {
            return res.send({success: 'You are registred!!!'})
            }
        });
      });
    });
  }
});
//----------
// Login
//----------
router.post('/login', passport.authenticate('local'), function(req, res){
  res.status('ok').json({user: req.user._id});
});
router.post('/like', function(req, res){
  User.findOneAndUpdate({_id: req.body.userId}, {$push: {preferredShops: req.body.shopId}}, function(err, user){
    if(err){
      console.log(err);
    }
    res.send('ok')
  })
})

router.post('/dislike', function(req, res){
  User.findOneAndUpdate({_id: req.body.userId}, {$push: {dislikedShops: {shop: req.body.shopId, createdAt: Date.now()}}}, function(err, user){
    if(err){
      console.log(err);
    }
    res.send('ok')
  })
})

router.post('/remove-liked', function(req, res){
  console.log(req.body);
  User.update({_id: req.body.userId}, { $pullAll: {preferredShops: [req.body.shopId]}}, function(err, user){
    if (err) {
      console.log(err);
    }
    res.send('OK')
  })
})

// logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;

