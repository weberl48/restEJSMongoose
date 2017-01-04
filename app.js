var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

//Schema Setup
var campgroundSchema = new mongoose.Schema({name: String, image: String})

var Campground = mongoose.model("Campground", campgroundSchema)

app.get('/', function(req, res) {
    res.render('landing')
})

app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from DBC
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campground', {campgrounds: campgrounds})

        }
    })

})

app.post('/campgrounds', function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var newCampground = {
        name: name,
        image: image
    }
    Campground.create(newCampground, function(err,newlyCreated) {
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
app.listen(3000, function() {
    console.log('Server has started');
})
