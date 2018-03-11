import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {worldMap} from './MapComponent/map.component';
// import {searchBar} from './SearchComponent/search.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {searchBarComponent} from './SearchComponent/search.component';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './Search-Services/search.service';


@NgModule({
  declarations: [
    AppComponent,
    worldMap,
    searchBarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSelectModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
