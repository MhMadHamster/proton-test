import 'leaflet';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Restaurant } from '../../models/model.restaurant';
import { MapService } from '../../services/map.service';

import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'map-component',
  template: '<div id="map"></div>',
  styleUrls: [ './map.component.css' ],
})
export class MapComponent implements OnInit {
  @Input() restaurants: Restaurant[];
  @Input() active: string;
  @Input() loadMarkers: EventEmitter<[{}]> = new EventEmitter();
  markers = {};

  private _map: any;

  private _accessToken = 'pk.eyJ1IjoibWhtYWRoYW1zdGVyIiwiYSI6ImNqMTdvb21qaTAwM3MzM3J1eGYwZmMzOWsifQ.-nbDFlApXG2jqylvwKD4eA';

  constructor(private _mapService: MapService) { }

  ngOnInit(): void {
    this._map = L.map('map').setView([-33.87036190000001, 151.1978505], 16);

    L.tileLayer(`https://api.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=${this._accessToken}`, {
      attribution: `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,
        <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>`,
      maxZoom: 18,
    }).addTo(this._map);

    this._mapService.loadMap(this._map);
  }
}
