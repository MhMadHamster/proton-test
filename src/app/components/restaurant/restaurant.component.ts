import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from './restaurant';

@Component({
  selector: 'restaurant-component',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  @Input() restaurant: Restaurant;
  @Input() active: boolean;
  @Output() restaurantDelete: EventEmitter<Restaurant> = new EventEmitter();

  deleteRestaurant(restaurant: Restaurant): void {
    this.restaurantDelete.emit(restaurant);
  }
}
