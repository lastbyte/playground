import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FourierSeriesComponent } from './fourier-series/fourier-series.component';
import { DijkstrasComponent } from './dijkstras/dijkstras.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    FourierSeriesComponent,
    DijkstrasComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    NgbModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
