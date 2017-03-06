var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
	console.log("getting favories");
	Favorites.find({postedBy : req.decoded._doc._id})
	.populate('postedBy')
	.populate('dishes')
	.exec(function(err, favorites) {
		if(err) {
			console.log(err);
			throw err;
		};
		console.log(favorites);
		res.json(favorites);
	});
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

		Favorites.find({postedBy : req.decoded._doc._id},function(err,favorite) {
			if(err) throw err;
			if(favorite.length === 0) {
				var obj = {
					postedBy : req.decoded._doc._id,
				}
				Favorites.create(obj,function(err, favorite) {
					if(err) throw err;
					favorite.dishes.push(req.body._id);
					favorite.save(function(err,favorite) {
						if (err) throw err;
						res.json(favorite);
					});
				})
			} 
			else {
				var exists = false;
				var length = favorite[0].dishes.length;
				for(var index = 0; index < length; index++){
					exists = favorite[0].dishes[index] == req.body._id;
					if(exists) break;
				}
				if(!exists){
					favorite[0].dishes.push(req.body._id);
					favorite[0].save(function(err,favorite) {
						if(err) throw err;
						res.json(favorite);
					})
				}
				else{
					res.json({status : "Already added"});
				}
			}
		})

})
.delete(Verify.verifyOrdinaryUser,function(req,res,next) {
	Favorites.remove({postedBy : req.decoded._doc._id},function(err,favorite) {
		if (err) throw err;
		res.json(favorite);
	})
});

favoriteRouter.route("/:dishId")
.delete(Verify.verifyOrdinaryUser,function(req,res,next) {
	Favorites.find({postedBy: req.decoded._doc._id},function(err,favorite) {
		if (err) throw err;
		if(favorite.length > 0) {
			for(var index = favorite[0].dishes.length - 1; index >= 0; index--) {
				if(favorite[0].dishes[index]==req.params.dishId)
					favorite[0].dishes.remove(req.params.dishId);
			}
			favorite[0].save(function(err,favorite) {
				if (err) throw err;
				res.json(favorite);
			})
		}
	})
})
module.exports = favoriteRouter;