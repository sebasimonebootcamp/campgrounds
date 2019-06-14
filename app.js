var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"), 
    request = require("request"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comments"),
    User = require("./models/user"),
    seedDB = require("./seeds")


//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Te sigo aunque sea en lo cuasi delictual", 
    resave: false, 
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp", { useNewUrlParser: true });
seedDB();


app.get("/", function(req, res) {
    res.redirect("/campgrounds");
})

app.get("/campgrounds", function(req, res) {

    Campground.find({}, function(err, campground) {
        if (err) {
            console.log(err)
        } else(
            res.render("campgrounds/index", { campground: campground })
        )
    })
})

app.post("/campgrounds", function(req, res) {
    var campgroundName = req.body.name;
    var campgroundImg = req.body.img;
    var campgroundDesc = req.body.description;

    Campground.create({
        name: campgroundName,
        img: campgroundImg,
        description: campgroundDesc

    }, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('campgrounds')
        }
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/postNewCamp")
})


app.get("/campgrounds/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCampground)
            res.render("campgrounds/show", { campground: foundCampground })
        }
    })
})

app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds/")
        } else {
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
    
})

app.get("/login", function(req,res){
    res.render("login")
})

app.post("/login",passport.authenticate("local",
    {
    sucessRedirect: "/campgrounds", 
    failureRedirect:"/login"}),
     function(req,res){
})


app.get("/register", function(req,res){
    res.render("register")
})

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

app.get("/showRest", function(req, res) {
    res.render("showRoutes")
})

app.listen(3000, function() {
    console.log("Server is running")
})