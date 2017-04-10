import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from './models/model.restaurant';
import { Modal } from './components/modal/modal';
import { RestaurantService } from './services/restaurant.service';
import { MapService } from './services/map.service';
import { MapComponent } from './components/map/map.component';

import '../styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ RestaurantService, ]
})
export class AppComponent implements OnInit {
  title = 'Closest Restaurants';
  restaurants: Restaurant[] = [];
  selectedRestaurant: string;
  private isModalVisible = false;
  private isModalRestaurantVisible = false;
  private modal: Modal;

  @ViewChild(MapComponent)
  private map: MapComponent;

  constructor(private restaurantService: RestaurantService, private mapService: MapService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().then(restaurants => {
      this.restaurants = restaurants
      this.mapService.loadMarkers(restaurants);
    });
  }

  onSelect(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant.id;
    this.mapService.changeActiveMarker(restaurant.id);
  }

  handleRestaurantDelete(restaurant: Restaurant): void {
    this.modal = new Modal(
      'Confirm',
      `<p>Do you want to delete ${restaurant.name}?</p>`,
      restaurant.id
    );
    this.isModalVisible = true;
  }

  closeModal(confirm: boolean): void {
    if (confirm === true) {
      this.restaurants.some((item, i) => {
        if (item.id === this.modal.id) {
          this.restaurants.splice(i, 1);
          this.mapService.removeMarker(this.modal.id);
          return true;
        }
        return false;
      });
    }
    this.isModalVisible = false;
    delete this.modal;
  }

  newRestaurant(restaurant: Restaurant | boolean): void {
    if (typeof restaurant !== 'boolean') {
      this.restaurants.push(restaurant);
      this.restaurants = this.restaurants.slice();
    }
    this.isModalRestaurantVisible = false;
  }

  addRestaurant(): void {
    this.isModalRestaurantVisible = true;
  }
}
