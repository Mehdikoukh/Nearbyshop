var	express = require('express'),
	router  = express.Router(),
	bcrypt  = require('bcryptjs'),
	geolib  = require('geo-lib')

let Shop = require('../models/schemashop');
let User = require('../models/schemauser');

router.post('/shops', function(req, res){
  User.findOne({_id: req.body.userId}, function(err, user){
    var shopsToHide = user.preferredShops
    var expiredDislikes = []
    for(var i = 0; i<user.dislikedShops.length; i++){
      if(!dislikeHasExpired(user.dislikedShops[i].createdAt)){
        shopsToHide.push(user.dislikedShops[i].shop)
      } else {
        expiredDislikes.push(i)
      }
    }
    Shop.find({_id: {$nin: shopsToHide}}, function(err, shops){
      sortByDistance(shops, [req.body.userLoc.lat, req.body.userLoc.lon])
      res.send({shops})
    })

    if (expiredDislikes.length>0) {
      user.dislikedShops.splice(expiredDislikes)
      user.save(function(err, usr){
        if (err) {
          console.log(err);
        }
        console.log(usr);
      })
    }
  })
})

router.post('/preferred-shops', function(req, res){
  User.findOne({_id: req.body.userId}, function(err, user){
    Shop.find({_id: user.preferredShops}, function(err, shops){
      sortByDistance(shops, [req.body.userLoc.lat, req.body.userLoc.lon])
      res.send({shops})
    })
  })
})

function sortByDistance(shops, usrLoc){
  for(var i = 0; i<shops.length; i++){
    shops[i].location.dist = geolib.distance([usrLoc,[shops[i].location.coordinates[1], shops[i].location.coordinates[0]]]).distance
  }
  shops.sort(function(a, b){
    return a.location.dist - b.location.dist;
  })
  return shops;
}

function dislikeHasExpired(dateCreated){
  if (((Date.now() - dateCreated) / 60000) > 120) { //Convert time from ms to minutes
    return true
  }
  return false
}

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;
