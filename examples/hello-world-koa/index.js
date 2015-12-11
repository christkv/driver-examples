"use strict"

var Koa = require('koa'),
  co = require('co'),
  convert = require('koa-convert'),
  MongoClient = require('mongodb').MongoClient;

// Simple test connection
var uri = 'mongodb://localhost:27017/example';

// The KOA application
var app = new Koa();

// Router
var router = require('koa-router')();

// Co function
co(function*(){
  // Get a connection
  var db = yield MongoClient.connect(uri);

  // Add a router entry
  router.get('/', function(ctx, next) {
    return new Promise(function(resolve, reject) {
      co(function*() {
        // Get the result of the ismaster
        var result = yield db.command({ismaster:true});
        // Set the response to be the JSON of the result
        ctx.body = JSON.stringify(result);
        // Resolve the promise
        resolve();
      }).catch(reject);
    });
  });

  // Add routes
  app
    .use(router.routes())
    .use(router.allowedMethods());

  // Listen to port
  var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example Koa app listening at http://%s:%s', host, port);
  });
}).catch(function(err) {
  console.log(err.stack);
  process.exit(0);
});
