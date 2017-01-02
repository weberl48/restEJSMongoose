var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


app.get('/', function(req,res) {
  res.render('landing')
})

var campgrounds = [
  {name: "Alleganey", Image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
  {name: "Letchworth", Image:"https://www.nps.gov/bicy/planyourvisit/images/DSC00856_1.JPG"},
  {name: "Grand Canyon" ,Image:"http://www.greenvalleycamp.com/images/Green_Valley_Campgrounds_011.jpg"},
]
app.get('/campgrounds', function(req,res){

  res.render('campground', {campgrounds: campgrounds})
})

app.post('/campgrounds', function(req,res){
  var name = req.body.name
  var image = req.body.image
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground)
res.redirect('/campgrounds')
  })

  app.get('/campgrounds/new', function(req,res) {
    res.render('new')
  })
app.listen(3000, function(){
  console.log('Server has started');
})
