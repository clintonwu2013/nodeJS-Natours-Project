db.tours.insertMany([{name:"the sea explorer",price:425,rating:7.8},{name:"the sea explorer2",price:42,rating:8.7,difficulty:8.9}])

db.tours.find();
db.tours.find({"name":"the sea explorer"});
db.tours.find({price:{$lte:500}});
db.tours.find({price:{$lte:500}, rating:{$gte:8}});
db.tours.find({ $or:[{price:{$lt:500}},{ rating:{$gt:8}}]});

db.tours.updateOne({name:"the forest hiker"},{$set:{price:597}})