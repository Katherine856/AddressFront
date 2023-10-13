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

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

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
    BulkLoadComponent
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
    {
       provide: APP_INITIALIZER,
       useFactory: initializeAppFactory,
       deps: [PrimeNGConfig],
       multi: true,
    },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
