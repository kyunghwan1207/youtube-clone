const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const { Favorite } = require('../models/Favorite');

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {
    // let movieId = req.body.movieId; // index.js에서 body-parser가 있기 대문에 body 사용가능
    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId}) // DB 필드에 select 쿼리 날림
        .exec((err, rows) => {
            if(err) return res.status(400).send(err)
            // rows: [1, 2, 3] 이랗게 되어있음
            res.status(200).json({success: true, favoriteNumber: rows.length}) // 지금 몇명이 좋아요했는지 정보 보내줌
        })

    // 그 다음에 프론트에서 다시 숫자정보 보내주기
})
router.post('/favorited', (req, res) => {
    // 내가 이 영화를 Favoirte 리스트에 넣었느지 정보를 DB에서 가져오기

    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom}) // DB 필드에 select 쿼리 날림
        .exec((err, rows) => {
            if(err) return res.status(400).send(err)
            // rows: [1, 2, 3] 이랗게 되어있음
            let result = false;
            if(rows.length !== 0){
                result = true;
            }
            res.status(200).json({success: true, favorited: result}) // 지금 몇명이 좋아요했는지 정보 보내줌
        })

    // 그 다음에 프론트에서 다시 숫자정보 보내주기
})

router.post('/removeFromFavorite', (req, res) => {
    console.log('POST | removeFromFavorite /req.body: ', req.body)
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, doc })
        })
})

router.post('/addToFavorite', (req, res) => {
    console.log('POST | addToFavorite /req.body: ', req.body)
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, doc })
    })
})

router.post('/getFavoriteMovies', (req, res) => {
    console.log('req.body: ', req.body);
    Favorite.find({userFrom: req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites }) // 좋아하는 영화정보들이 favorites에 리스트형태로 넘어감
        })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({success: true, doc})
        })
})

module.exports = router;
