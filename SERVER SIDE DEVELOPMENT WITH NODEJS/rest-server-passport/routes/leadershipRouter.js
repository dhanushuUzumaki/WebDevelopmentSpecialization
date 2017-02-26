var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Leadership = require('../models/leadership');

var leadershipRouter = express.Router();
leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leadership.find({}, function (err, Leadership) {
        if (err) throw err;
        res.json(Leadership);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.create(req.body, function (err, Leadership) {
        if (err) throw err;
        console.log('Leadership created!');
        var id = Leadership._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Leadership with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leadershipRouter.route('/:LeadershipId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leadership.findById(req.params.LeadershipId, function (err, Leadership) {
        if (err) throw err;
        res.json(Leadership);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Leadership.findByIdAndUpdate(req.params.LeadershipId, {
        $set: req.body
    }, {
        new: true
    }, function (err, Leadership) {
        if (err) throw err;
        res.json(Leadership);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Leadership.findByIdAndRemove(req.params.LeadershipId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = leadershipRouter;