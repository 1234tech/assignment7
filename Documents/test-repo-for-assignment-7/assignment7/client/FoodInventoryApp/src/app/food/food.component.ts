import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [FoodService]
})
export class FoodComponent implements OnInit {

  @Input() food;

  constructor(private foodService:FoodService){
    }
    foodList = null;
    ngOnInit(){
//      this.foodList = this.foodService.listFood();
      this.foodService.listFood().subscribe((allFoods)=>{
        this.foodList = allFoods;
      });

    }//end ngOnit
    deleteFood(){
      this.foodService.deleteFood(this.food._id)
      .subscribe((deletedfood)=>{
        console.log(deletedfood);
        location.reload();
      })
    }

}//end class
