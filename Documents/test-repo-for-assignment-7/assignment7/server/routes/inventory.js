var express = require('express');
var router = express.Router();

var Food = require('../models/foodModel');

router.get('/', function(req, res, next) {
    res.send('nothing should happen here');
});

//Router to add an item
router.get('/add', function(req, res, next) {
  console.log("----This is the get router / add.")
  res.render('add');
});

//Router for confirmation page that an item was added
router.post('/add-confirmation', function(req, res, next) {
  console.log("----This is the POST router /add-confirmation.");
  var formInputs = {
    brandName: req.body.brandName,
    itemName: req.body.itemName,
    expirationMonth: req.body.expirationMonth,
    expirationDay: req.body.expirationDay,
    expirationYear: req.body.expirationYear,
    quantity: req.body.quantity,
    location: req.body.location
  }

  var foods = new Food(formInputs);
  console.log("----This is the line before foods.save()" + foods);

  foods.save()
    .then(()=>{
      console.log("----saved to database");
        res.render('add-confirmation', formInputs);
      })
      .catch((err)=>{
        if (err){
          console.log(err);
          throw new Error("GroceryError", formInputs);
        }
    });
});

//Router to list all items
router.get('/list', function(req, res, next) {
  console.log("----This is the get router /list");

  Food.find()
  .then((searchResults)=>{
    console.log("----searching database");
    console.log("----The searchResults are: " + searchResults);
      res.render('list', {foods: searchResults});
    })
    .catch((err)=>{
      if (err){
        console.log(err);
        throw new Error("GroceryError", searchResults);
        }
      });
});

//Router to get an item to update
router.get('/update/:foodtoupdate', function(req, res, next){
    console.log("----This is the get router / update/:foodtoupdate");
    var foodtoupdate = req.params.foodtoupdate;
    console.log("-----This is the pathname for the foodtoupdate: " + foodtoupdate);

  Food.findById({'_id': req.params.foodtoupdate})
  .then((singleResult)=>{
    console.log("----Food to update is: " + singleResult);
    res.render('updateForm', {food: singleResult});//end render
      })//end then
    .catch((err)=>{
      if (err){
        console.log(err);
        throw new Error("UpdateError", singleResult);
      }//end if
  });//end catch

});

//Router to post updated information to database
router.post('/update/:foodtoupdate', function(req, res, next){
    console.log("----This is the POST router /update/:foodtoupdate");
    console.log("----req.params.foodtoupdate = " + req.params.foodtoupdate);

  Food.findById({'_id': req.params.foodtoupdate})
  .then((foodUpdate)=>{
    console.log("----This is the req.params.foodtoupdate: " + req.params.foodtoupdate);
    var updatedItems = {
      brandName: req.body.brandName,
      itemName: req.body.itemName,
      expirationMonth: req.body.expirationMonth,
      expirationDay: req.body.expirationDay,
      expirationYear: req.body.expirationYear,
      quantity: req.body.quantity,
      location: req.body.location
    }
    console.log("----These are the updated items: " + updatedItems);
    foodUpdate.set(updatedItems);
    console.log("----These are the updated items: " +  updatedItems);
    foodUpdate.save().then(()=>{
      res.redirect('/inventory/list');
    })
    .catch((err)=>{
      if (err){
        console.log(err);
        throw new Error("UpdateError", singleResult);
      }//end if
    });//end catch
  });
});

//Router to delete item
router.get('/remove/:foodtoremove', function(req, res, next){
  Food.deleteOne({'_id': req.params.foodtoremove})
  .then((deletedFood)=>{
    console.log("----This food was deleted: "  + deletedFood);
    res.redirect('/inventory/list');
  })
  .catch((err)=>{
    if (err){
      console.log(err);
      throw new Error("GroceryError", deletedFood);
      }
    });
});

module.exports = router;
