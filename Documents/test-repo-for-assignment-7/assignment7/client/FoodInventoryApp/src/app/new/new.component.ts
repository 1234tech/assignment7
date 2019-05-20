import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [FoodService]
})
export class NewComponent implements OnInit {

//@Output() newFood = new EventEmitter();

  newfood:any = {};
  foodInputs:any = {};

  constructor(private foodService:FoodService) { }

  ngOnInit() {
  }

  save(newfoodForm):void{

    var foodInputs = {
      brandName: this.newfood.brandName,
      itemName: this.newfood.itemName,
      expirationMonth: this.newfood.expirationMonth,
      expirationDay: this.newfood.expirationDay,
      expirationYear: this.newfood.expirationYear,
      quantity: this.newfood.quantity,
      location: this.newfood.location
      }

    this.foodService.createFood(foodInputs)
    .subscribe((newfood)=>{
//      this.newFood.emit();
      location.href='/list';
    });
  }//end save
}//end class
