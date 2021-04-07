import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
})
export class AddMealComponent implements OnInit {
  meals: Array<any> = [];
  mealsDetails: Object = {};
  category: any;
  constructor() {}
  mealForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  addMeal() {
    this.mealsDetails = this.mealForm.value;
    this.category = this.mealForm.value.category;
    if (localStorage.getItem(this.category) !== null) {
      this.meals = JSON.parse(localStorage.getItem(this.category) || '[]');
      this.meals.push(this.mealsDetails);
      localStorage.setItem(this.category, JSON.stringify(this.meals));
    } else {
      this.meals = [];
      this.meals.push(this.mealsDetails);
      localStorage.setItem(this.category, JSON.stringify(this.meals));
    }
    this.mealForm.reset();
  }
}
