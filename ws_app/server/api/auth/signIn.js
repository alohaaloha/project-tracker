var express = require('express');
var router = express.Router();

/* https://www.npmjs.com/package/bcryptjs */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
/* entities */
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/', function(req, res) {

     User.findOne(

      {username: req.body.username},

      function(err, user) {

          if (err){
              res.send({success: false, msg: 'Error.'});
              return;
          }

          if (!user) {
              res.send({success: false, msg: 'Authentication failed. User not found.'});
          } else {
                  // check if password matches
                /*  if (bcrypt.compareSync(req.body.password, user.password)) {
                    //TODO DTO umesto cistog user
                    req.session.user = user;
                    res.send({success: true, msg:'Successfully signed in!'});
                  } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.', WTF:req.body.password+" "+user.password});
                  }*/

                  bcrypt.compare(req.body.password, user.password, function(erro, ress) {
                      // res == true
                      if(ress==true){
                          req.session.user = user;
                          res.send({success: true, msg:'Successfully signed in!'});
                      }else{
                      res.send({success: false, msg: 'Authentication failed. Wrong password.', err:erro});
                      }

                  });

                  /*
                  if (req.body.password===user.password) {
                    //TODO DTO umesto cistog user
                    req.session.user = user;
                    res.send({success: true, msg:'Successfully signed in!'});
                  } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                  }
                  */



          }
      }
      );

  });


  module.exports = router;
