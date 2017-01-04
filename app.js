var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

//Schema Setup
var campgroundSchema = new mongoose.Schema({name: String, image: String, description: String})

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create({name:'Alleganey', image:'http://www.photosforclass.com/download/6106475454', description: 'beautiful mountain views'})


app.get('/', function(req, res) {
    res.render('landing')
})
//INDEX: SHOW ALL CAMPGROUNDS
app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from DBC
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: campgrounds})

        }
    })

})
//CREATEROUTE Add new campground to database
app.post('/campgrounds', function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = {
        name: name,
        image: image,
        description: description
    }
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect('/campgrounds')

        }
    })
})

app.get('/campgrounds/new', function(req, res) {
    res.render('new')
})

app.get("/campgrounds/:id", function(req, res) {
Campground.findById(req.params.id, function(err, foundCampground) {
if (err) {
  console.log(err);
} else {
  res.render('show', {campground: foundCampground});
}
})
})
app.listen(3000, function() {
    console.log('Server has started');
})
