var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var unirest = require('unirest');
var Cloudant = require('cloudant');
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

var cloudant = Cloudant({account:'40509e6f-7bf4-4941-a173-1e6bec4910dc-bluemix', password:'9c68fb724f92fc7e756d529c440e77da42389c3576d11144ef2777daf9232b28'}, function(err, cloudant) {
    if (err) {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use('pca');
});

var appEnv = cfenv.getAppEnv();
var server = app.listen(appEnv.port, function() {
  console.log('listening:', appEnv.url);
});

module.exports = server;


app.get('/', function(req, res) {
	res.render('login');
});

app.get('/home', function(req, res){
  res.render('home');
});

app.get('/finder', function(req, res){
  res.render('finder');
});

app.get('/safe', function(req, res) {
	res.render('safe');
});

app.get('/finder1', function(req, res) {
	res.render('finder1');
})

app.get('/bot', function(req, res) {
	res.render('bot');
});

app.get('/danger', function(req, res) {
	res.render('danger');
})

app.get('/besoin', function(req, res) {
	res.render('besoin');
})

app.get('/validationsignal', function(req, res) {
	res.render('validationsignal');
})

app.get('/signaler', function(req,res) {
	res.render('signaler');
});

app.get('/verso', function(req, res){
  res.render('verso');
});

app.get('/flip', function(req, res){
  res.render('flip');
});

app.get('/test', function(req, res){
  res.render('testflip');
});

app.all('*', function(req, res){
    if(!req.query.proxy){
      return res.status(404).send();
    }
});


