var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var User = require("./models/user")


var data = [
    {name: "Old Cabin",
     img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, quae sequi magnam repellat asperiores sit excepturi molestiae culpa voluptas doloribus, assumenda deserunt doloremque ipsa tempore, ad modi. Odio, quia magnam.", 
    },
    {name: "The Hatch",
     img: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, quae sequi magnam repellat asperiores sit excepturi molestiae culpa voluptas doloribus, assumenda deserunt doloremque ipsa tempore, ad modi. Odio, quia magnam.", 
    }, 
    {name: "The Lighthouse",
     img: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, quae sequi magnam repellat asperiores sit excepturi molestiae culpa voluptas doloribus, assumenda deserunt doloremque ipsa tempore, ad modi. Odio, quia magnam.", 
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
        console.log("Removed Campgrounds")
    Comment.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("Removed all Comments")
        }
    User.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("Removed all users")
        }
    })
    })
        data.forEach(function(camp){
            Campground.create(camp, function(err,campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a Campground")
                    Comment.create(
                        {
                            text: "This place is truly awesome",
                            author: "Sebastián"
                        }, function(err,comment){
                            if(err){
                                console.log(err)
                             } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("added a comment");         
                                }
                    })
                }
            })
        })}
    })
}

module.exports = seedDB;