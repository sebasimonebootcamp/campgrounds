var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser :true});

var catSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    temperament: String
})

var Cat = mongoose.model("Cat", catSchema)


var sully = new Cat({
    name: "Axel", 
    age: "110", 
    temperament: "not so nice"
})


sully.save(function(err, cat){
    if(err){
        console.log("Something went wrong")
        console.log(err)
    } else {
        console.log("We saved a cat to the db:")
        console.log(cat);
    }
});

