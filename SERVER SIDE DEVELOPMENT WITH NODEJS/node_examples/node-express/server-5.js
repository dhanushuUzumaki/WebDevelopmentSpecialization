var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishRouter = require('./dishRouter');
var promotionRouter = require('./promotionRouter');
var leadershipRouter = require('./leadershipRouter');

app.use('/dishes',dishRouter);
app.use('/promotions',promotionRouter);
app.use('/leadership',leadershipRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});