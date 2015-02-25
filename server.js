var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');

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

var client = new cassandra.Client( { contactPoints : [ '10.0.0.2' ]} );
client.connect(function(err, result) {
    console.log('Connected to Cassandra');
});

app.get('/metakey', function(req, res) {
    var arrKeyspaces = [];
	for( var ks in client.metadata.keyspaces ) {
	    arrKeyspaces.push( ks );
	}
   	res.send(arrKeyspaces);
});

// app.post('/t', function(req, res) {
//     var keyspace=req.body.keyspace;
//     console.log("Keyspace = "+ keyspace);    
// });

app.post('/metatable', function(req, res) {
    var newclient = new cassandra.Client( { contactPoints : [ '10.0.0.2' ], keyspace: 'system'} );
    newclient.connect(function(err, result) {
        console.log('Connected to new keyspace');
    });

    console.log("Keyspace = "+ req.body.keyspace); 
    newclient.execute('SELECT * FROM schema_columnfamilies where keyspace_name = ?', [req.body.keyspace] , function(err, result) {
        if (err) {
            res.status(404).send({ msg : 'Schema not found' });
        } else {
            var table = result.rows;
            res.send(table);        
        }
    });
    // var arrTables = [];
    // for( var tb in client.metadata.tables ) {
    //     arrTables.push( tb );
    // }
    // res.send(arrTables);
});

// app.get('/api/tables', function(req, res) {
//     newclient.execute('SELECT * FROM USERS;', function(err, result) {
//         if (err) {
//             res.status(404).send({ msg : 'Schema not found' });
//         } else {
//             var user = result.rows;
//             res.send(user);        }
//     });
// });