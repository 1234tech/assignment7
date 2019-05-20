var express = require('express');
var router = express.Router();
var foodController = require('../../controllers/foodController');

var FoodService = foodController.FoodService;

router.use((req, res, next)=>{
    res.set({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers':'Content-type, Access-Control-Allow-Headers',
      'Content-type':'application/json'
    });
/*    if(req.method == 'OPTIONS') {
      return res.status(200).end();
    }*/
    next();
});//end router

//show homepage
router.get('/', (req, res, next)=> {
  res.render('index');
});//end router

//list all in json
router.get('/list', (req, res, next)=>{
  FoodService.list()
  .then((searchResults)=>{
    console.log("listing food complete");
    res.status(200);
//    res.set({'Content-type':'application/json'});
//    res.render('list', {foods: searchResults});
    res.json(searchResults);
  })
});//end router


//find one in json
router.get('/list/:foodtofind', (req, res, next)=>{
  FoodService.read(req.params.foodtofind)
  .then((singleResult)=>{
    console.log("found one food complete");
    res.status(200);
//    res.set({'Content-type':'application/json'});
    res.json(singleResult);
  }).catch((err)=>{
    res.status(404);
    res.end();
  });
});//end router


//Router to add an item
router.get('/add', function(req, res, next) {
  console.log("----This is the get router / add.")
  res.render('add');
});

//create one
router.post('/add-confirmation', (req, res, next)=>{
  var formInputs = {
    brandName: req.body.brandName,
    itemName: req.body.itemName,
    expirationMonth: req.body.expirationMonth,
    expirationDay: req.body.expirationDay,
    expirationYear: req.body.expirationYear,
    quantity: req.body.quantity,
    location: req.body.location
  }

  FoodService.create(formInputs)
  .then((food)=>{
    console.log("created new food");
    res.status(201);
//    res.set({'Content-type':'application/json'});
//    res.render('add-confirmation', formInputs);
    res.json(food);
  }).catch((err)=>{
    res.status(404);
    res.end();
  })
});//end route

//update one
router.put('/update/:foodtoupdate', (req, res, next)=>{
  let putdata = req.body;
  FoodService.update(req.params.foodtoupdate, putdata)
  .then((updatedFood)=>{
    res.status(200);
//    res.set({'Content-type':'application/json'});
    res.json(updatedFood);
  }).catch((err)=> {
    res.status(404);
    res.end();
  })
});

//delete one
router.delete('/delete/:foodtodelete', (req, res, next)=>{
  FoodService.delete({'_id': req.params.foodtodelete})
  .then((deletedFood)=>{
    res.status(200);
//    res.set({'Content-type':'application/json'});
    res.json(deletedFood);
  }).catch((err)=>{
    res.status(404);
    res.end();
  });
});

module.exports = router;
