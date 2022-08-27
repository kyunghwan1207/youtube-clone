const express = require('express');
const router = express.Router();

const {Subscriber} = require('../models/Subscriber');

router.get('/subscribeNumber', (req, res) => {
    // 모든걸 가져와야하니까 find
    console.log('GET | subscribeNumber / req.body: ', req.body)
    Subscriber.find({userTo: req.body.userTo})
        .exec((err, subscribe) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, subscribeNumber: subscribe.length})

        })
})

router.post('/subscribed', (req, res) => {
    console.log('POST | subscribed / req.body: ', req.body);
    Subscriber.find({userTo: req.body.userTo, userFrom: req.body.userFrom})
        .exec((err, subscribe) => {
            if(err) return res.status(400).json({success: false, err});
            let result = false;
            if (subscribe.length !== 0){ // userTo userFrom 일치하는 doc이 하나 이상이라면 이미 구독중인 것이므로 true
                result = true;
            }
            return res.status(200).json({success: true, result})
        })
})

// 구독 취소
router.post('/unSubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, doc})
        })
})

// 구독하기
router.post('/subscribe', (req, res) => {
    let subscribe = new Subscriber(req.body)
    subscribe.save((err, doc) => {
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, doc})
    })
})

module.exports = router;