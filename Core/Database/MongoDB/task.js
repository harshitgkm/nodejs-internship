------------- MongoDB queries -----------

1. Write a query to find all movies that share at least one cast member with "Blacksmith Scene."

db.movies.find({ cast: { $in: db.movies.findOne({ title: "Blacksmith Scene" }).cast } })


2. Write a query to find the top 5 movies with the highest IMDb ratings that were released before the year 1900.

db.movies.aggregate([ {$match: {"year" : { $lt: 1900 }  }},  {$sort: {"imdb.rating": -1 }  }  ])


3. Write a query to find all movies directed by "William K.L. Dickson." Return the titles, release years, and IMDb ratings of the movies.

db.movies.aggregate([ {$match: {directors : "William K.L. Dickson" }}, {$project: { title: 1, author: 1, "imdb.rating": 1, directors: 1, _id: 0}}])


4. Write an aggregation query to find the top 3 directors who have directed the most movies in the "Short" genre. Return the directors' names and the number of movies.

db.movies.aggregate([{$match: {genres: "Short" }}, { $unwind: "$directors"  }, {$group: {_id: "$directors", movieCount: {$sum: 1 }} }, {$sort: {movieCount: -1}} , {$limit :3}, {$project:{director: "$_id", movieCount: 1  }  }] )
