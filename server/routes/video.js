const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require("multer");
const ffmgeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        // if (ext != 'mp4') {
        //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        // }
        cb(null, true)
    }

})
var upload = multer({ storage: storage }).single("file");

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    console.log('in router | POST | /uploadfiles')
    upload(req, res, err => {
        if(err) {
            return res.json({success: false, err})
        }
        return res.json({
            success: true, 
            url: res.req.file.path, 
            fileName: res.req.file.filename})
    })
})

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성하고 비디오 러닝타임도 가져오기
    let filePath = '';
    let fileDuration = '';

    // 비디오 정보가져오기
    ffmgeg.ffprobe(req.body.url, function(err, metadata) {
        console.log(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성
    ffmgeg(req.body.url)
     .on('filenames', function (filenames) {
        console.log('filenames: ', filenames);
        filePath = "uploads/thumbnails/" + filenames[0]
     })
     .on('end', function() {
        console.log('ScreenShots taken');
        return res.json({success: true, url: filePath, fileDuration: fileDuration})
     })
    .on('error', function(err){
        console.log(err);
        return res.json({success: false, err});
    })
    .screenshot({
        count:3, // 3개의 썸네일 찍을 수 있다
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png' // %b: 파일 확장자 제거
    })
})

router.post('/uploadVideo', (req, res) => {

    let video = new Video(req.body);
    video.save((err, doc) => {
        if(err) return res.status(400).json({success: false})
        return res.status(200).json({success: true, doc})
    })

})

router.get("/getVideos", (req, res) => {
    // 모든 비디오 가져옴
    Video.find() // populate 해줘야 writter의 _id만 가져오는게 아니라 다 땡겨올 수 있음
        .populate('writter')
        .exec((err, videos) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, videos})
        })
})
router.post('/getVideoDetail', (req, res) => {
    Video.findOne({_id: req.body.videoId})
        .populate('writter')
        .exec((err, videoDetail) => {
            if (err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, videoDetail})
        })
})

module.exports = router;
