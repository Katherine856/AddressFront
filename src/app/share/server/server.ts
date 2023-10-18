import { HttpRequest } from '@angular/common/http';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { Country } from '../models/country';
import { GeographicalDivision } from '../models/geographicalDivision';
import { Product_Service } from '../models/product_service';


@Injectable({
  providedIn: 'root'
})

export class Servidor {

    url = environment.apiUrl; 

    constructor(private httpClient: HttpClient) { }

    getCountrys(): Observable<Country>{
        return this.httpClient.get<Country>(this.url + 'country/all');
    }

    getGeoDiv(id_Country: number): Observable<GeographicalDivision>{
        return this.httpClient.get<GeographicalDivision>(this.url + `geographicaldivision/all/${id_Country}`);
    }

    getProducts(): Observable<Product_Service>{
        return this.httpClient.get<Product_Service>(this.url + 'product_service/all/products');
    }

    getServices(): Observable<Product_Service>{
        return this.httpClient.get<Product_Service>(this.url + 'product_service/all/services');
    }

    createAddress(address: Address): Observable<Address>{
      return this.httpClient.post<Address>(this.url + 'address/create', address);
    }

    // crearCuenta(cuenta: Cuenta): Observable<Cuenta>{
    //   return this.httpClient.post<Cuenta>(this.url + 'cuenta/nuevo', cuenta);
    // }

    // consignar(transaccion: Transaccion): Observable<Transaccion>{
    //   return this.httpClient.post<Transaccion>(this.url + 'transaccion/consignar', transaccion);
    // }

    // consultar(transaccion: Transaccion) {
    //   return this.httpClient.post(this.url + 'transaccion/consultar', transaccion);
    // }

    // retirar(transaccion: Transaccion): Observable<Transaccion>{
    //   return this.httpClient.post<Transaccion>(this.url + 'transaccion/retirar', transaccion);
    // }

    // calIntereses(){
    //   return this.httpClient.get(this.url + 'transaccion/intereses');
    // }
}