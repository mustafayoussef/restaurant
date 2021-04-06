import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RestaurantOrderComponent } from './components/restaurant-order/restaurant-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'resturant-order', pathMatch: 'full' },
  {
    path: 'resturant-order',
    component: RestaurantOrderComponent,
    children: [
      { path: '', redirectTo: 'add-order', pathMatch: 'full' },
      { path: 'add-order', component: AddOrderComponent },
      { path: 'add-meal', component: AddMealComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
