
var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;
var hotelData = require('../data/hotel-data.json'); 

module.exports.hotelsGetAll = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection('hotels');

  /*var db = dbconn.get();
  var dbName = db.db('meanhotel') //fix for mongodb>=3
  var collection = dbName.collection('hotels');
  */
  
   // dbName.collection('hotels')



 
  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find() //general method
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs){
      console.log('Found hotels', docs);
      res
        .status(200)
        .json(docs);
    });

};

module.exports.hotelsGetOne = function(req, res) {
 /*var db = dbconn.get();
  var dbName = db.db('meanhotel') //fix for mongodb>=3
  var collection = dbName.collection('hotels');
  */


  var db = dbconn.get();
  var collection = db.collection('hotels');

  var hotelId = req.params.hotelId;
  console.log('GET hotelId', hotelId);

  collection
    .findOne({
      _id : ObjectId(hotelId)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
    });

};

module.exports.hotelsAddOne = function(req, res) {
 /*
 FIX for mongodb >=3
 var db = dbconn.get();
  var dbName = db.db('meanhotel') 
  var collection = dbName.collection('hotels');
  */


  var db = dbconn.get();
  var collection = db.collection('hotels');

  var newHotel;
  console.log("POST new hotel");

  if (req.body && req.body.name) {
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);
    console.log(newHotel);
    collection.insertOne(newHotel, function(err, response) {
       console.log(response);
       res
      .status(200)
      .json(newHotel);
  });
  } else {
   console.log("Data missing from body");
   res
     .status(400)
     .json({ message : "Required data missing from body" });
  }

};
