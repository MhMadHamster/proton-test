import { Injectable, EventEmitter } from '@angular/core';

import { Restaurant } from '../models/model.restaurant';

import { Observable, Subject } from 'rxjs';

import '../../assets/marker.png';
import '../../assets/marker-shadow.png';
import '../../assets/marker-active.png';

@Injectable()
export class MapService {
  private _markers: Map<string, any> = new Map();
  private _map: any = null;
  private _currentActiveMarker: string = null;
  private _myIcon: any;
  private _myIconActive: any;

  private _dataLoaded: Subject<boolean> = new Subject();
  private _mapLoaded: Subject<boolean> = new Subject();

  public selectRestaurant: EventEmitter<string> = new EventEmitter();
  public placeNewMarker: EventEmitter<{lat: number, lng: number}> = new EventEmitter();

  constructor() {
    this._myIcon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [14, 40],
    });

    this._myIconActive = L.icon({
      iconUrl: 'assets/marker-active.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [14, 40],
    });

    Observable.combineLatest(this._dataLoaded, this._mapLoaded).subscribe(value => {
      if (value[0] && value[1]) {
        this._placeMarkers();
      }
    });
  }

  private _toggleMarker(obj: {case: string, marker: any}): void {
    switch (obj.case) {
      case 'activate':
        obj.marker.setIcon(this._myIconActive);
        this._map.setView(obj.marker.getLatLng());
        break;
      case 'deactivate':
        obj.marker.setIcon(this._myIcon);
        break;
      default:
        break;
    }
  }

  private _placeMarkers() {
    this._markers.forEach((value, key, map) => {
      const marker = L.marker([value.location.lat, value.location.lng], {
        icon: this._myIcon,
      }).addTo(this._map);
      map.set(key, marker);
    });
  }

  public loadMarkers(restaurants: Restaurant[]): void {
    restaurants.forEach(restaurant => {
      this._markers.set(restaurant.id, restaurant);
    });
    this._dataLoaded.next(true);
  }

  public loadMap(map: {}): void {
    this._map = map;
    this._mapLoaded.next(true);
  }

  public changeActiveMarker(id: string): void {
    if (this._currentActiveMarker !== null) {
      this._toggleMarker({case: 'deactivate', marker: this._markers.get(this._currentActiveMarker)});
    }
    this._toggleMarker({case: 'activate', marker: this._markers.get(id)});
    this._currentActiveMarker = id;
  }

  public removeMarker(id: string): void {
    this._map.removeLayer(this._markers.get(id));
    this._map.delete(id);
  }
}
