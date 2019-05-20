import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  private apiurl = environment.apiurl;

  listFood(){
//    return this.foodList;
      return this.http.get(this.apiurl + 'apifood/list');
  }
  getFood(id){
    return this.http.get(this.apiurl + 'apifood/list/' + id);
  }

  updateFood(id, foodtoedit){
    return this.http.put(this.apiurl + 'apifood/update/' + id, foodtoedit);
  }

  createFood(foodInputs){
      return this.http.post(this.apiurl + 'apifood/add-confirmation', foodInputs);
  }

  deleteFood(id){
    return this.http.delete(this.apiurl + 'apifood/delete/' + id);
  }

  /*
    foodList = [
        {
          brandName: 'Generic',
          itemName: 'Broccoli',
          quantity: 1,
          expirationMonth: 'January',
          expirationDay: 1,
          expirationYear: 2019,
          location: 'refrigerator'
        },
        {
          brandName: 'Fresh',
          itemName: 'Kale',
          quantity: 2,
          expirationMonth: 'February',
          expirationDay: 2,
          expirationYear: 2020,
          location: 'pantry'
        },
        {
          brandName: 'OreIda',
          itemName: 'French Fries',
          quantity: 3,
          expirationMonth: 'March',
          expirationDay: 3,
          expirationYear: 2023,
          location: 'freezer'
        }
      ]

      */
}//end export class
