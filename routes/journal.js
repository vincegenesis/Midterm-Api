const express = require('express');
const router = express.Router();
const Journal = require('../models/journaldb');


router.post('/journal', (req,res) => {
    
    if(!req.session.user){
        return res.status(401).send();
    }else{

        const journal =  new Journal({
            title : req.body.title,
            message : req.body.message,
            imageUrl : req.body.imageUrl,
            ownerId : req.session.user._id
        });
        
        journal.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message : err});
            res.status(500).send();
        })
    }

   
    });



router.delete('/journal/:postId', async (req,res) =>{
    if(!req.session.user){
        return res.status(401).send();
    }else{
        try{const deleteJournal = await Journal.deleteOne({_id: req.params.postId});
     res.json(deleteJournal);
    }catch(err){
        res.json({message : err});   }

    }   

    
});

router.patch('/journal/:postId', async (req,res) => {
    if(!req.session.user){
        return res.status(401).send();
    }else{
        try{const updateJournal = await Journal.updateOne({_id: req.params.postId},
            {$set: {title : req.body.title,
                message : req.body.message,
                imageUrl : req.body.imageUrl, 
                updatedAt: new Date()}});
        res.json(updateJournal);
    
        }catch(err){
        res.json({message : err});
        }
    }
    
   
});

router.get('/journal/:postId', async (req,res) =>{
    if(!req.session.user){
        return res.status(401).send();
    }else{
        try{const getSingleJournal = await Journal.find({_id:req.params.postId});
        res.json(getSingleJournal);
        res.status(200).send();
        }catch(err){
            res.json({message : err});
            res.status(500).send();

        }  
    }
   
});

router.get('/journal', async (req,res) =>{
    if(!req.session.user){
        return res.status(401).send();
    }else{
        try{const getJournals = await Journal.find({ownerId:req.session.user._id});
        res.json(getJournals);
        res.status(200).send();
        }catch(err){
            res.json({message : err});
            res.status(500).send();

        }  
    }
   
});


module.exports = router;