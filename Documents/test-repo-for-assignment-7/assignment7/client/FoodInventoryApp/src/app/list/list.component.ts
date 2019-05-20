import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [FoodService]
})
export class ListComponent implements OnInit {

  constructor(private foodService:FoodService){
    }
    foodList = null;
    ngOnInit(){
  //      this.foodList = this.foodService.listFood();
  this.foodService.listFood().subscribe((allFoods)=>{
    this.foodList = allFoods;
  });


    }//end ngOnit



}//end class
