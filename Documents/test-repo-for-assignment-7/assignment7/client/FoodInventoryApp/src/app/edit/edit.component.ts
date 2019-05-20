import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  foodtoedit:any;

  constructor(private route: ActivatedRoute,
              private foodService:FoodService) { }

  ngOnInit() {
    this.getFood();
  }//end Oninit

  getFood(): void{
    const param = this.route.snapshot.paramMap.get('id');
    this.foodService.getFood(param)
    .subscribe((oneFood) =>{
      this.foodtoedit = oneFood;
    });
  }//end getFood

  updateFood(obj:any):void {
    this.foodtoedit.brandName = obj.brandName;
    this.foodtoedit.itemName = obj.itemName;
    this.foodtoedit.quantity = obj.quantity;
    this.foodtoedit.expirationMonth = obj.expirationMonth;
    this.foodtoedit.expirationDay = obj.expirationDay;
    this.foodtoedit.expirationYear = obj.expirationYear;
    this.foodtoedit.location = obj.location;
    this.foodService.updateFood(this.foodtoedit._id, this.foodtoedit)
    .subscribe((result)=>{
      location.href='/list';
    })
  }

}//end class
