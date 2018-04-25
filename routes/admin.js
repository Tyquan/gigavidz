var express = require('express');
var mongoose = require('mongoose');
var Video = require('../models/video');
var Message = require('../models/message');
var router = express.Router();

// render Dashboard page
router.get('/dashboard', (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).send("You have to be logged in to view this section");
    }
    res.render('admin/dashboard');
});

/* Users Routes */
router.get('/allvideos', (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).send("You have to be logged in to view this section");
    }
    Video.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.render('admin/videos/allvideos', { videos: data });
        }
    });
});
router.get('/showvideo/:id', (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).send("You have to be logged in to view this section");
    }
    Video.findById(req.params.id, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.render('admin/videos/showvideo', {
                video: data
            });
        }
    });
});
router.get('/createvideo', (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).send("You have to be logged in to view this section");
    }
    res.render('admin/videos/createvideo');
});

router.post('/createvideo', (req, res, next) => {
    var video = new Video(req.body);
    video.save((err, data) => {
        if (err) {
            throw err;
        } else {
            res.redirect('admin/dashboard');
        }
    });
});


/* Message Routes */
router.get('/incomingmessages', (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).send("You have to be logged in to view this section");
    }
    Message.find({}, (err, messages) => {
        if (err) {
            throw err;
        } else {
            res.render('admin/messages/incomingmessages', {
                messages: messages
            });
        }
    });
});
router.get('/showmessage/:id', (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).send("You have to be logged in to view this section");
    }
    Message.findById(req.params.id, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.render('admin/messages/showmessage', {
                user: data
            });
        }
    });
});

module.exports = router;