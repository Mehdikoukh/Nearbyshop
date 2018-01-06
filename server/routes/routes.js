const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const crypto    = require('crypto');


let User = require('../models/user');

//Register
router.post('/register', function(req, res){
  
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.repassword;

  req.checkBody('email', 'Empty').notEmpty();
  req.checkBody('email', 'Wrong Password').isEmail();
  req.checkBody('password', 'Empty').notEmpty();
  req.checkBody('repassword', 'Wrong Password').equals(req.body.password);

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
module.exports = router;