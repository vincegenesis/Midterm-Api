const express = require('express');
const router = express.Router();
const User = require('../models/usersdb');


router.get('/users', async (req,res) =>{
    try{const users =  await User.find();
        res.json(users);
        res.status(200).send();
    }catch(err){
        res.json({message : err});
        res.status(500).send();
    }
  
});

router.get('/users/:username', async (req,res) =>{
    console.log(req.params.username);
    var username = req.params.username;
    try{const user = await User.find({"username":  { $regex: username }});
        res.json(user);
        res.status(200).send();


    }catch(err){
        res.json({message : err});
        res.status(500).send();

    }
  
});

module.exports = router;