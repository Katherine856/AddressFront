import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { PrimeModule } from './primeNG/prime.module';

import { LoginComponent } from './pages/login/login.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemAddressComponent } from './components/item-address/item-address.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAddressComponent,
    HomeComponent,
    ItemAddressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
