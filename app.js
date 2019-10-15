const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const userRoute = require('./routes/user');
const usersRoute = require('./routes/users');
const followRoute = require('./routes/following');
const journalRoute = require('./routes/journal')


app.use(session({secret:"asdkjalsdjlka",resave : false,saveUninitialized:true}));

app.use('/user', userRoute);
app.use('/',followRoute);
app.use('/',usersRoute);
app.use('/',journalRoute);





mongoose.connect('mongodb+srv://vincegenesis:CAPSLOCKinsert@myjournal-bcswf.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,  useUnifiedTopology: true },
(err) => {
    if(!err){console.log("connected to mongoDB sucessfully!")}
    else{console.log('Error in DB Connection' + err)}
});
app.listen(3000);