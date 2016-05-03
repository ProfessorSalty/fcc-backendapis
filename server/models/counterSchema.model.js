const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: {type: String, required: true},
  count: {type: Number, default: 1000}
},{
  versionKey: false
});

module.exports = mongoose.model('counter', CounterSchema);


/*
{
    _id: 'urlCount',
    count: 1000
}
 */
