var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    views: {
        type: Number
    },
    date_created: {
        type: Date,
        default: Date.now
    }
    
});

var Video = mongoose.model('Video', videoSchema);

module.exports = Video;