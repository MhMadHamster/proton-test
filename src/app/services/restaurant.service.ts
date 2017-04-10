import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Restaurant } from '../models/model.restaurant';

@Injectable()
export class RestaurantService {
  private restaurantsUrl = 'http://www.mocky.io/v2/58e776b20f0000e2174aeff8';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getRestaurants(): Promise<Restaurant[]> {
    return this.http.get(this.restaurantsUrl)
      .toPromise()
      .then(res => {
        return (res.json().results.map((item: {}) => ({
          ...item,
          active: false,
        })) as Restaurant[]);
      })
      .catch(this.handleError);
  }
}
