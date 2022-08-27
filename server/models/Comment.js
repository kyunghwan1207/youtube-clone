const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
   writter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
   },
   postId: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
   },
   responseTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
   },
   content:{
    type: String
   }

}, {timestamps: true})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }