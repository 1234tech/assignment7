var foodModel = require('../models/foodModel');

class FoodService {

  static list(){
    return foodModel.find({})
    .then((searchResults)=>{
      return searchResults;
    });
  }//end list

  static read(id){
    return foodModel.findById(id)
    .then((singleResult)=>{
      return singleResult;
    });
  }//end read


  static create(obj){
    var food = new foodModel(obj);
    return food.save();
  }//end create

  static update(id, data){
    return foodModel.findById(id)
    .then((updatedFood)=> {
      updatedFood.set(data);
      updatedFood.save();
      return updatedFood;
    });
  }//end update

  static delete(id){
    return foodModel.deleteOne({_id: id})
    .then((deletedFood)=> {
      return deletedFood;
    })
  }//end delete


}//end of class

module.exports.FoodService = FoodService;
