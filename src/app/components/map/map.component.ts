import 'leaflet';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Restaurant } from '../../models/model.restaurant';

import 'leaflet/dist/leaflet.css';

import '../../../assets/marker.png';
import '../../../assets/marker-shadow.png';
import '../../../assets/marker-active.png';

@Component({
  selector: 'map-component',
  template: '<div id="map"></div>',
  styleUrls: [ './map.component.css' ]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() restaurants: Restaurant[];
  @Input() active: string;
  map: any;
  markers = {};
  myIcon: any;
  myIconActive: any;

  private accessToken = 'pk.eyJ1IjoibWhtYWRoYW1zdGVyIiwiYSI6ImNqMTdvb21qaTAwM3MzM3J1eGYwZmMzOWsifQ.-nbDFlApXG2jqylvwKD4eA';

  ngOnInit(): void {
    this.map = L.map('map').setView([-33.87036190000001, 151.1978505], 16);

    this.myIcon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [14, 40],
    });

    this.myIconActive = L.icon({
      iconUrl: 'assets/marker-active.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [14, 40],
    });

    L.tileLayer(`https://api.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=${this.accessToken}`, {
      attribution: `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,
        <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>`,
      maxZoom: 18,
    }).addTo(this.map);
  }

  ngOnChanges(): void {
    if (this.restaurants !== undefined) {
      this.restaurants.forEach(restaurant => {
        if (this.markers[restaurant.id] === undefined) {
          const icon = restaurant.id === this.active ? this.myIconActive : this.myIcon;
          const marker = L.marker([restaurant.location.lat, restaurant.location.lng], {
            icon: icon,
          }).addTo(this.map)
          .on('click', () => {
            console.log(this);
          });
          this.markers[restaurant.id] = {
            ...restaurant,
            marker: marker,
          }
        } else {
          if (restaurant.id === this.active) {
            const { marker } = this.markers[restaurant.id];
            marker.setIcon(this.myIconActive);
            this.map.setView(marker.getLatLng());
          } else {
            this.markers[restaurant.id].marker.setIcon(this.myIcon);
          }
        }
      });
    }
  }

  removeMarker(id: string): void {
    this.map.removeLayer(this.markers[id].marker);
    delete this.markers[id];
  }
}
