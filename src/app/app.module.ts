import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantOrderComponent } from './components/restaurant-order/restaurant-order.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantOrderComponent,
    AddMealComponent,
    AddOrderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
