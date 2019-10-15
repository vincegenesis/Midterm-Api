const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   username : {type:String , unique:true},
   email : String,
   password: String,
   following : [{
       userId : String
   }]



},{minimize: false });

module.exports = mongoose.model('users', UserSchema);   