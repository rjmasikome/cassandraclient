var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');
var async = require('async');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var client = new cassandra.Client( { contactPoints : [ '10.0.0.2' ], keyspace: 'demo' } );
client.connect(function(err, result) {
    console.log('Connected to Cassandra');
});

app.get('/api/shows', function(req, res) {
    client.execute('SELECT * FROM USERS;', function(err, result) {
        if (err) {
            res.status(404).send({ msg : 'Schema not found' });
        } else {
        	var user = result.rows;
            res.send(user);        }
    });
});