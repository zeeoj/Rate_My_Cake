var Cake =require('../models/cake').cake;
var Rating = require('../models/cake').rating;

module.exports={
    index : function (req, res){
        res.sendFile(_dirname + 'index.html')
    },

    getAllCakes : function(req, res){
        Cake.find({}, function (err, cakes){
            if(err){
                res.json({errorMsg:"Could not be found", data:cakes})
            }
            else{
                res.json({message:"Success", data: cakes})
            }
        })
    },
    makeNewCake : function(req, res){
        var newCake = new Cake({baker : req.body.baker, url : req.body.url, ratings : [], createdAt : new Date(), updatedAt : new Date()})
        newCake.save(function(err){
            if (err){
                res.json({errorMsg:"Could not be found", data:newCake})
            }
            else{
                res.json({message : "Success", data : newCake})
            }
        })
    },
    // makeNewRating: function(req, res){
    //     var newRating = new Rating({stars: req.body.stars, comments: req.body.comments})
    //     newRating.save(function(err) {
    //         if (err) {
    //             res.json({errorMsg: "Could not be found", data: newRating})
    //         } else {
    //             Cake.updateOne({_id: Object(req.body.id)}, {$push: {ratings: newRating}}, function (err) {
    //                 if (err) {
    //                     console.log("Something went wrong: " + err)
    //                 } else {
    //                     res.json({message: "Success", data: newRating})
    //                 }
    //
    //             })
    //             }
    //         })
    //     },

    makeNewRating: function(req, res){
        Cake.findById({ _id: req.params.id }, function (err, cake) {
            if (err) {
                res.json({errorMsg: "Could not be found", data: newRating})
            } else {
                // Cake.updateOne({_id: Object(req.body.id)}, {$push: {ratings: newRating}}, function (err) {
                //     if (err) {
                //         console.log("Something went wrong: " + err)
                //     } else {
                //         res.json({message: "Success", data: newRating})
                //     }
                //
                // })

                cake.ratings.push(req.body);
                var sum = 0;
                for (var i = 0; i < cake.ratings.length; i++){
                    sum = sum + cake.ratings[i].stars;
                }
                cake.avgRating = sum/cake.ratings.length;
                cake.save(function(err) {
                    if (!err) {
                        res.json({message: 'Success', data: cake});
                    } else {
                        res.json({errorMsg: "Cannot create cake", data: err})
                    }
                });
            }
        })
    },
    findCake: function(req, res){
        Cake.findOne({ _id: req.params.id }, function (err, cake) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err });
            } else {
                res.json(cake);
            }
        })


    }
}