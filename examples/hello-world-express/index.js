// Load all needed modules
var express = require('express'),
  MongoClient = require('mongodb').MongoClient;

// Create an express application
var app = express();

// MongoDB connection URL (assumes a MongoDB server is running locally on port 27017)
var uri = 'mongodb://localhost:27017/example';

// Connect to MongoDB server
MongoClient.connect(uri, function(err, db) {
  // If we have an error exit
  if(err) {
    console.log(err.stack);
    process.exit(0);
  }

  // Define a top level route
  app.get('/', function (req, res) {
    // Execute the ismaster command
    db.command({ismaster:true}, function(err, r) {
      // Return the result as a JSON string
      res.send(JSON.stringify(r));
    });
  });

  // Create a new express listener
  var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example Express app listening at http://%s:%s', host, port);
  });
});
