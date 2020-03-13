import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FourierSeriesComponent} from './fourier-series/fourier-series.component';
import {DijkstrasComponent} from './dijkstras/dijkstras.component';
import {PrimeNumberComponent} from './prime-number/prime-number.component';
import {PrimsComponent} from './prims/prims.component';

export const router: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'fourier-series', component: FourierSeriesComponent },
  { path: 'dijkstra-shortest-path', component: DijkstrasComponent },
  { path: 'prime-numbers', component: PrimeNumberComponent },
  { path: 'prims-mst', component: PrimsComponent },
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

