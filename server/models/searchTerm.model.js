const mongoose = require('mongoose'), Schema = mongoose.Schema;

const searchTermSchema = new Schema({
  searchTerm: String,
  pageNumber: {type: Number, default: 1},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('searchTermModel', searchTermSchema);
