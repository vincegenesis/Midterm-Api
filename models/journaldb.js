const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
   title : String,
   message : String,
   imageUrl: String,
   ownerId :Object,
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date }


},{minimize: false });

module.exports = mongoose.model('journals', JournalSchema);   