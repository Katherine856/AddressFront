import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { PrimeModule } from './primeNG/prime.module';
import { PrimeNGConfig } from 'primeng/api';

import { LoginComponent } from './pages/login/login.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemAddressComponent } from './components/item-address/item-address.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditComponent } from './pages/edit/edit.component';
import { BulkLoadComponent } from './pages/bulk-load/bulk-load.component';
import { MapComponent } from './components/map/map.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAddressComponent,
    HomeComponent,
    ItemAddressComponent,
    HeaderComponent,
    FooterComponent,
    EditComponent,
    BulkLoadComponent,
    MapComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [
    
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
