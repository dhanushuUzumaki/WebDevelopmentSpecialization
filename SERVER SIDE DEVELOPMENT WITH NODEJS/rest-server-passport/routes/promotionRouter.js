var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Promotions = require('../models/promotions');

var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.find({}, function (err, Promotion) {
        if (err) throw err;
        res.json(Promotion);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.create(req.body, function (err, Promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        var id = Promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Promotion with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

promotionRouter.route('/:PromotionId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.findById(req.params.PromotionId, function (err, Promotion) {
        if (err) throw err;
        res.json(Promotion);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.PromotionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, Promotion) {
        if (err) throw err;
        res.json(Promotion);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.PromotionId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = promotionRouter;