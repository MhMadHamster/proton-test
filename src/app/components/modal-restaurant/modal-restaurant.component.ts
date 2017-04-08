import { Component, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../restaurant/restaurant';
import { v4 } from 'uuid';

@Component({
  selector: 'modal-restaurant-component',
  templateUrl: './modal-restaurant.component.html',
  styleUrls: [ './modal-restaurant.component.css' ]
})
export class ModalRestaurantComponent {
  @Output() newRestaurant: EventEmitter<Restaurant | boolean> = new EventEmitter();
  restaurant: Restaurant = {
    id: v4(),
    active: false,
    name: 'name',
    location: {
      lat: 0,
      lng: 0
    }
  };

  private confirm() {
    this.newRestaurant.emit(this.restaurant);
  }

  private close() {
    this.newRestaurant.emit(false);
  }
}
