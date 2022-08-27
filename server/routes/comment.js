const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post('/saveComment', (req, res) => {
    const new_comment = new Comment(req.body)
    new_comment.save((err, comment) => {
        if(err) return res.status(400).json({success: false, err})
        Comment.find({'_id': comment._id})
            .populate('writter')
            .exec((err, result) => {
                if (err) return res.status(400).json({success: false, err})
                return res.status(200).json({success: true, result })
            })
    })
})

router.post('/getComments', (req, res) => {
    Comment.find({'postId': req.body.postId})
        .populate('writter')
        .exec((err, comments) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, comments})
        })
})

module.exports = router;
