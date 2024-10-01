------------- Topics --------------
* What is aggregation?
* Different type of aggregate operators
* Types : match, count, sort, group, limit, skip, project, addField, lookup, out, facet, arrayElemAt, Unwind
* What is an aggregation pipeline?
* What is $ and $$ used for?
* Use of let variable.
* Indexes and types of indexing(TTL)
* Pagination and offset
* cursor(dollar on right side inside double quotes).
* When finding in Array : array.field
* When finding in object : obj.field
* Nested obj: obj.field1.field2
* Skip does’nt improve  performance as a function , but it does in aggregation pipeline.



* Inside $project, if you want to rename field
{
title:
trivia: “$plot”
plot: 0
}


$group:{
_id: first name,
Phone: {
$push: “$phone”
} }



// Inside group whatever we define, will be applicable to that subset of group only.
// no conditional mapping inside group. We can use $match instead.
// Lookup is very slow.
// Pipeline for single collection.
// $facet.
// $arrayElemAt
// aggregate parameter pipeline 
// indexes in mongo - tel, text based 





------------- aggregation -----------
------------- group -----------------
* db.movies.aggregate([ {$group: {_id : "$countries"}} ])
* This will return the distinct values from the 'countries' field.



------------ limit ------------
* db.movies.aggregate([ { $limit: 1 } ])


------------ project --------------
* db.movies.aggregate([{ $project: { "awards":1 ,"directors": 1, "year" :1} }, {$limit : 2} ])
* db.movies.aggregate([{ $project: { "tomatoes.viewer":1 ,"directors": 1, "year" :1} }, {$limit : 2} ])


------------ count --------------
* db.movies.aggregate([ { $match: { "year": 1991 } }, { $count: "totalCountOfCountries" }] )



------------ sort --------------
* db.movies.aggregate([{$sort: {"year" : 1}}, { $project: { "tomatoes.viewer":1 ,"directors": 1, "year" :1} }, {$limit : 2} ])


------------ match --------------
* db.movies.aggregate([{$match: {directors: "William Heise"}}, {$sort: {"year" : 1}},  { $project: { "tomatoes.viewer":1 ,"directors": 1, "year" :1} }, {$limit : 1} ])


------------ addFields --------------
db.movies.aggregate([ {$addFields: {newField: "test" }}])
db.movies.aggregate([ {$addFields: {newField: "test" }}, {$project: { "title": 1, "writers" :1, "newField" :1  }  }])


------------- Find total award wins by countries USA -------------
db.movies.aggregate([ { $match: { countries: 'USA' } }, { $group: { _id: null, totalWins: { $sum: "$awards.wins" } } }] )

Note: _id: null: This tells MongoDB that you don’t want to group the results by any particular field; instead, you want to treat all the matched documents as one group.




************** 1 *****************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    }, 
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $count: "total"
    }
]);


*********** 2 *************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $unwind: {
            path: "$genres"
        }
    },
    {
        $project: {
            "awards": 1,
            "directors": 1,
            "year": 1
        }
    }
]);





************ 3 ************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $group: {
            _id: "$year",
            title: { $push: "$title" }
        }
    }
]);



**************** 4 ****************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $group: {
            _id: "$year",
            title: { $push: "$title" },
            count: { $sum: 1 }
        }
    }
]);



************* 5 ****************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $lookup: {
            from: "comments",
            foreignField: "movie_id",
            localField: "_id",
            as: "comments"
        }
    }
]);


************* 6 ****************
db.movies.aggregate([
    {
        $lookup: {
            from: "comments",
            foreignField: "movie_id",
            localField: "_id",
            as: "comments"
        }
    },
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    }
]);





************* 7 ****************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            average: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $group: {
            _id: "$countries",
            totalCountOfCountries: { $sum: 1 }
        }
    }
]);




************* 8 ****************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            avg_ratings: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $facet: {
            groupBy: [
                {
                    $group: {
                        _id: "$year",
                        title: { $push: "$title" },
                        count: { $sum: 1 }
                    }
                }
            ],
            count: [
                {
                    $count: "title"
                }
            ]
        }
    }
]);




************* 9 ****************
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 5 }
        }
    },
    {
        $addFields: {
            avg_ratings: {
                $avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
            }
        }
    },
    {
        $match: {
            "year": { $gte: 1910 }
        }
    },
    {
        $facet: {
            offset: [
                { $skip: 10 },
                { $limit: 10 }
            ],
            count: [
                { $count: "title" }
            ]
        }
    },
    {
        $out: "my new collection"
    }
]);
