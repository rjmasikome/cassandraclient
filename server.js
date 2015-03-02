var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');

var app = express();
var contactPoint = '10.0.0.2';

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var client = new cassandra.Client( { contactPoints : [ contactPoint ]} );
client.connect(function(err, result) {
    if (err) {
            console.log('Unable to connect, please make sure your database is running');
        } else {
            console.log('Connected to Cassandra');      
        }
});

app.get('/api/metakey', function(req, res) {
    var arrKeyspaces = [];
    arrKeyspaces.push( client.metadata );
   	res.send(arrKeyspaces);
});

app.post('/api/heartbeat', function(req, res) {
    var newclient = new cassandra.Client( { contactPoints : [ contactPoint ], keyspace: 'system'} );
    newclient.execute('SELECT * from local', function(err, result) {
        if (err) {
            res.status(404).send({ msg : 'Schema not found' });
        } else {
            var data = result.rows;
            res.send(data);        
        }
    });
});

app.post('/api/metatable', function(req, res) {
    var newclient = new cassandra.Client( { contactPoints : [ contactPoint ], keyspace: 'system'} );
    newclient.connect(function(err, result) {
        console.log('Connected to new keyspace');
    });

    console.log("Keyspace = "+ req.body.keyspace); 
    newclient.execute('SELECT * FROM schema_columnfamilies where keyspace_name = ?', [req.body.keyspace] , function(err, result) {
        if (err) {
            res.status(404).send({ msg : 'Schema not found' });
        } else {
            var data = result.rows;
            res.send(data);        
        }
    });
});

app.post('/api/gentable', function(req, res) {
    var newclient = new cassandra.Client( { contactPoints : [ contactPoint ], keyspace: [req.body.keyspace]} );
    newclient.connect(function(err, result) {
        console.log('Connected to new keyspace');
    });
 
    newclient.execute('SELECT * FROM ' + [req.body.table], function(err, result) {
        if (err) {
            res.status(404).send([err]);
        } else {
            var data = result.rows;
            res.send(data);        
        }
    });
});

app.post('/api/genmeta', function(req, res) {
    var newclient = new cassandra.Client( { contactPoints : [ contactPoint ], keyspace: 'system'} );
    newclient.connect(function(err, result) {
        console.log('Connected to new keyspace');
    });
 
    newclient.execute('SELECT * FROM schema_columns where keyspace_name = ?', [req.body.keyspace], function(err, result) {
        if (err) {
            res.status(404).send({ msg : 'Schema not found' });
        } else {
            var data = result.rows;
            res.send(data);        
        }
    });
});


app.post('/api/cql', function(req, res) {
    var newclient = new cassandra.Client( { contactPoints : [ contactPoint ], keyspace: [req.body.keyspace]} );
    newclient.connect(function(err, result) {
        console.log('Connected to new keyspace');
    });
    console.log([req.body.textq]);
    console.log(req.body.textq);
    newclient.execute(req.body.textq, function(err, result) {
        if (err) {
            console.log([err])
            res.status(404).send([err]);
        } else {
            var data = result.rows;
            res.send(data);        
        }
    });
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
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