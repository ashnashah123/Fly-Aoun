import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {worldMap} from './MapComponent/map.component';
import {searchBarComponent} from './SearchComponent/search.component';import {MatButtonModule} from '@angular/material/button';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { SearchService } from './Search-Services/search.service';


@NgModule({
  declarations: [
    AppComponent,
    worldMap,
    searchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
