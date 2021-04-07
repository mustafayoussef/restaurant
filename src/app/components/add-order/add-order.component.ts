import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  meals: Array<any> = [];
  originalPrice: number = 0;
  price: number = 0;
  spicyChanged: number = 0;
  q: number = 1;
  item: any;
  items: Array<any> = [];
  isCombo = true;
  isSpicy = true;

  allOrder: Array<any> = [];
  totalOrder: number = 0;

  constructor() {
    this.getdata();
  }
  orderForm = new FormGroup({
    q: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    item: new FormControl(''),
    meal: new FormControl('', [Validators.required]),
    price: new FormControl(''),
    totalPrice: new FormControl(''),
  });
  ngOnInit(): void {}
  meal(data: any) {
    this.originalPrice = data.value.price;
    this.price = data.value.price;
  }
  change(category: any) {
    if (localStorage.getItem(category) !== null) {
      this.meals = JSON.parse(localStorage.getItem(category) || '');
    } else {
      console.log("don't have this in category");
    }
  }
  combo() {
    if (
      this.orderForm.get('meal')?.touched &&
      this.orderForm.get('meal')?.dirty
    ) {
      if (this.isCombo == true) {
        let newPrice = this.q * 2;
        this.price += newPrice;
      } else {
        this.price = this.originalPrice * this.q;
      }
      this.isCombo = !this.isCombo;
    }
  }
  spicy() {
    if (
      this.orderForm.get('meal')?.touched &&
      this.orderForm.get('meal')?.dirty
    ) {
      if (this.isSpicy == true) {
        let newPrice = this.q * 1;
        this.spicyChanged = newPrice;
        this.price += newPrice;
      } else {
        this.price -= this.spicyChanged;
      }
      this.isSpicy = !this.isSpicy;
    }
  }
  category() {
    return this.orderForm.get('category')?.touched;
  }
  quantity(data: any) {
    if (
      this.orderForm.get('meal')?.touched &&
      this.orderForm.get('meal')?.dirty
    ) {
      if (data < 1) data = 1;
      else data = data;
      this.q = data;
      this.price = this.originalPrice * data;
    }
  }
  addOrder() {
    this.item = this.orderForm.value.meal.name;
    let priceItems = this.q * this.originalPrice;
    this.orderForm.controls['totalPrice'].setValue(this.price);
    this.orderForm.controls['price'].setValue(priceItems);
    this.orderForm.controls['item'].setValue(this.item);

    if (localStorage.getItem('items') == null) {
      this.items = JSON.parse(localStorage.getItem('items') || '[]');
      this.items.push(this.orderForm.value);
      localStorage.setItem('items', JSON.stringify(this.items));
    } else {
      this.items.push(this.orderForm.value);
      localStorage.setItem('items', JSON.stringify(this.items));
    }
    this.orderForm.reset();
    this.price = 0;
    this.getdata();
  }

  getdata() {
    if (localStorage.getItem('items') !== null) {
      this.allOrder = JSON.parse(localStorage.getItem('items') || '[]');
      for (let order of this.allOrder) {
        this.totalOrder += order.totalPrice;
      }
    } else {
      console.log('No Data');
    }
  }
  newOrder() {
    this.orderForm.reset();
    localStorage.removeItem('items');
    this.getdata();
  }
}
