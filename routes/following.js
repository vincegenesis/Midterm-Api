const express = require('express');
const router = express.Router();
const User = require('../models/usersdb');




router.post('/follow/:postId', async (req,res) =>{
    if(!req.session.user){
        return res.status(401).send();
    }else{
        try{const follow = await User.updateOne({_id: req.session.user._id},
        {$push: {following : {userId:req.params.postId}}});
     res.json(follow);
    }catch(err){
        res.json({message : err});
    }}
    
});

router.delete('/unfollow/:postId', async (req,res) =>{
    if(!req.session.user){
        return res.status(401).send();
    }else{
        try{const unfollow = await User.updateOne({_id: req.session.user._id},
            {$pull: {following : {userId:req.params.postId}}});
         res.json(unfollow);
        }catch(err){
            res.json({message : err});
        }
    }

  
});

router.get('/following', async (req,res) =>{

    if(!req.session.user){
        return res.status(401).send();
    }else{


        User.aggregate()

        try{const users =  await User.find();
            res.json(users);
            res.status(200).send();
        }catch(err){
            res.json({message : err});
            res.status(500).send();
        }
    }


   
  
});


module.exports = router;