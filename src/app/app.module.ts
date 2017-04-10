import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MapService } from './services/map.service';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { MapComponent } from './components/map/map.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalRestaurantComponent } from './components/modal-restaurant/modal-restaurant.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    RestaurantComponent,
    MapComponent,
    ModalComponent,
    ModalRestaurantComponent
  ],
  providers: [
    MapService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
