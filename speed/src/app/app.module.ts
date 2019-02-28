import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchFilterCriteriaComponent } from './shared/search-filter-criteria/search-filter-criteria.component';
import { SearchFilterLaunchesComponent } from './shared/search-filter-launches/search-filter-launches.component';
import { FilteredLaunchesComponent } from './shared/filtered-launches/filtered-launches.component';
import { HttpClientModule } from '@angular/common/http';
import { CounterComponent } from './shared/counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AgencyEffects } from './core/store/agency/agency.effects';
import { LaunchEffects } from './core/store/launch/launch.effects';
import { StatusEffects } from './core/store/status/status.effects';
import { TypeEffects } from './core/store/type/type.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchFilterCriteriaComponent,
    SearchFilterLaunchesComponent,
    FilteredLaunchesComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
    EffectsModule.forRoot([AgencyEffects, LaunchEffects, StatusEffects, TypeEffects]),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
