'use strict';
const mongoose = require('mongoose'), Schema = mongoose.Schema,
      Counter = require('./counterSchema.model.js');

const UrlSchema = new Schema({
  _id: {type: Number, index: true},
  protocol: String,
  longUrl: String,
  shortUrl: String,
  createdOn: {type: Date, default: Date.now}
});

UrlSchema.pre('save', function(next) {
  var doc = this;
  Counter.findByIdAndUpdate({_id: 'urlCount'}, {$inc: {count: 1}}, {setDefaultsOnInsert: true, upsert: true, new: true}, (error, data) => {
      if(error){return next(error);}
      doc._id = data.count;
      next();
    });
  });

module.exports = mongoose.model('url', UrlSchema);
