------------- Topics --------------
* NoSQL - what and why?
* Types of NoSQL databases.
* collection(table), document(rows).
* Not optimised for relational operations.
* Query engine is generally used by SQL but CouchDB and Cassandra (and some others), are NoSQL types but  uses query engine.
* NoSQL is schemaless or engineless in general.
* SQL vs NoSQL.
* Single collection operation(R/W) are faster in noSQL as compared to single table operation in SQL.
* SQL is more efficient for relational operations.
* new Date(2024, 1, 1, 0,0,0,0,).toJSON() .
* Types of relationship in DBMS.
* 1 to many(eg. user obj -> tags) or one to one(eg : user obj -> phone number) in array of objects.
* CRUD operations in mongoDB.
* Update operators.
* Query operators.
* scaling 
* replica set
* sharding


---------- Task ------------
* Array of obj of 3 elements, remove middle element using pull - https://www.geeksforgeeks.org/mongodb-pull-operator
* .skip(), .limit(), .sort()
* Use all update operators on sample_mflix DB and collection name movies.
* Implement $and & $or in the same query.
* Implement regex with skip, limit. 



-------------- $pull --------------
The $pull operator in MongoDB is a powerful update operator used to remove all instances of a specified value or values from an array. This operator is particularly useful for modifying arrays within documents without retrieving and updating the entire array manually.


{
	"id":1,
	"name": "Alice",
	"skills": ["Java", "Javascript","Python"]
},
{
  "_id": 2,
  "name": "Bob",
  "skills": ["JavaScript", "Java", "C++"]
},
{
  "_id": 3,
  "name": "Charlie",
  "skills": ["Python", "Ruby", "JavaScript"]
}


db.collection.updateMany(
{ skills: "Java"},
{$pull : {skills: "Java"}}
)

* output * 
{
  "_id": 1,
  "name": "Alice",
  "skills": ["JavaScript", "Python"]
},
{
  "_id": 2,
  "name": "Bob",
  "skills": ["JavaScript", "C++"]
},
{
  "_id": 3,
  "name": "Charlie",
  "skills": ["Python", "Ruby", "JavaScript"]
}


-------------- to run mongosh on docker --------------
mongosh --username mongo --password Abcd_1234


-------------- $pull --------------
* update operators: db.movies.updateMany({ directors: "Charlie Chaplin"}, {$pull : {directors: "Charlie Chaplin"}})
* db.movies.updateMany({ directors: "director name"}, {$pull : {directors: "director name"}})

--------------$push --------------
* db.movies.updateMany({ }, {$push: {directors: "director name"}})


-------------- $pop --------------
* db.movies.updateOne({title: 'Wild and Woolly',}, { $pop: {writers: 1}})
* db.movies.updateOne({_id :ObjectId('573a1390f29313caabcd6377')}, { $pop: {writers: -1}})


-------------- $addToSet --------------
* db.movies.updateOne({ title: "Wild and Woolly"}, {$addToSet: {writers: "John Doe"}})


-------------- $inc --------------
* db.movies.updateOne({title: "Wild and Woolly"}, {$inc: {year:-2, "awards.wins": 2}})


-------------- $rename --------------
* db.movies.updateOne({title: "Wild and Woolly"}, {$rename: {'imdb rating': 'imdb'}})


-------------- $set --------------
* db.movies.updateOne({title: "Wild and Woolly"}, {$set: {'type': 'web series'}})


-------------- $unset --------------
* db.movies.updateOne({title: "Wild and Woolly"}, {$unset: {'type': ''}})


-------------- sort(), skip(), limit() --------------
* db.movies.find().sort({year: 1}).skip(1).limit(3)


-------------- $and, $or --------------
* db.movies.find({$and: [{$or: [ {writers: 'John Doe'}, {countries: 'USA'} ]} , {type: 'movie'} ]}).limit(3)


-------------- reference --------------
* https://www.mongodb.com/docs/manual/reference/operator/update/


-------------- regex --------------
* db.movies.find({title : {$regex : "win", $options: "i"}})
* reference : https://www.geeksforgeeks.org/mongodb-regex/