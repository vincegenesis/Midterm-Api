const express = require('express');
const router = express.Router();
const User = require('../models/usersdb');
var md5 = require('md5');
var Sess ;



router.post('/create', (req,res) => {
    console.log(req.body);
    var password = md5(req.body.password);
    const user =  new User({
        username : req.body.username,
        email : req.body.email,
        password : password,
        
    });
    
    user.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message : err});
        res.status(500).send();
    })
    });


    router.post('/login', (req,res) => {
      var username = req.body.username;
      var password = md5(req.body.password);
      User.findOne({username :  username, password : password}, (err,user) => {
          if(err){
              console.log(err);
              return res.status(500).send();
          }
          if(!user){
              return res.status(404).send();
          }

            req.session.user= user;
            console.log(user)
            return res.status(200).send();
            
      })

        }); 

    router.get('/user',(req,res) => {
        if(!req.session.user){
            return res.status(401).send();
        }else{
            console.log(Sess);
        }

        return res.status(200).send("welcome to dashboard")
    });
    
    router.get('/logout', (req,res) => {
        req.session.destroy();
        return res.status(200).send();
    });
     
  

module.exports = router;