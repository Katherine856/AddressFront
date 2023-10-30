import { HttpRequest } from '@angular/common/http';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { Country } from '../models/country';
import { GeographicalDivision } from '../models/geographicalDivision';
import { Product_Service } from '../models/product_service';
import { Credentials } from '../models/credentials';


@Injectable({
    providedIn: 'root'
})

export class Server {

    url = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    login(credentials: Credentials) {
        return this.httpClient.post(this.url + 'address/login', credentials);
    }

    getCountrys(): Observable<Country> {
        return this.httpClient.get<Country>(this.url + 'country/all');
    }

    getGeoDiv(id_Country: number): Observable<GeographicalDivision> {
        return this.httpClient.get<GeographicalDivision>(this.url + `geographicaldivision/all/${id_Country}`);
    }

    getProducts(): Observable<Product_Service> {
        return this.httpClient.get<Product_Service>(this.url + 'product_service/all/products');
    }

    getServices(): Observable<Product_Service> {
        return this.httpClient.get<Product_Service>(this.url + 'product_service/all/services');
    }

    createAddress(address: Address): Observable<Address> {
        return this.httpClient.post<Address>(this.url + 'address/create', address);
    }

    getAddresses(): Observable<Address> {
        return this.httpClient.get<Address>(this.url + 'address/all');
    }

    updateAddress(idAddress: number, idUser: number, address: Address): Observable<Address> {
        return this.httpClient.put<Address>(this.url + `address/update/${idAddress}/${idUser}`, address);
    }

    getAddress(idAddress: number): Observable<Address> {
        return this.httpClient.get<Address>(this.url + `address/${idAddress}`);
    }

    deleteAddress(idAddress: number): Observable<any> {
        return this.httpClient.delete(this.url + `address/delete/${idAddress}`);
    }

    upload(archivo: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        //Se agrega el archivo a la formData
        formData.append('addresses', archivo);
        //Se crea el HttpRequest con la configuración necesaria para la carga del archivo de tipo MultipartFile
        const post = new HttpRequest('POST', this.url + 'address/massiveAddresses', formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.httpClient.request(post);
    }

    logout() {
        localStorage.clear();
    }
}