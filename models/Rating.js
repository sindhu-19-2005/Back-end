const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,
        trim: true
      },

      productid: {
        type: String,
        required: true,
        trim: true
      },
      
      star: {
        type: Number,
        required: true,
        min: 0
      },

    description: {
        type: String,
        required: true,
        trim: true
      },
    });
    module.exports = mongoose.model('Rating', ratingSchema)