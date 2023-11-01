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
import { Change } from '../models/change';

@Injectable({
    providedIn: 'root'
})

export class Service {

    url = environment.apiUrl; //Url de la API 

    constructor(private httpClient: HttpClient) { }

    //Método para iniciar sesión
    login(credentials: Credentials) {
        return this.httpClient.post(this.url + 'address/login', credentials);
    }

    //Método que permite traer TODOS los paises
    getCountrys(): Observable<Country> {
        return this.httpClient.get<Country>(this.url + 'country/all');
    }

    //Método que permite traer las divisiones geograficas por pais
    getGeoDiv(id_Country: number): Observable<GeographicalDivision> {
        return this.httpClient.get<GeographicalDivision>(this.url + `geographicaldivision/all/${id_Country}`);
    }

    //Método que permite traer TODOS los productos
    getProducts(): Observable<Product_Service> {
        return this.httpClient.get<Product_Service>(this.url + 'product_service/all/products');
    }

    //Método que permite traer TODOS los servicios
    getServices(): Observable<Product_Service> {
        return this.httpClient.get<Product_Service>(this.url + 'product_service/all/services');
    }

    //Método que permite crear una dirección
    createAddress(address: Address): Observable<Address> {
        return this.httpClient.post<Address>(this.url + 'address/create', address);
    }

    //Método que permite traer TODAS las direcciones
    getAddresses(): Observable<Address> {
        return this.httpClient.get<Address>(this.url + 'address/all');
    }

    //Método que permite actualizar UNA dirección
    updateAddress(idAddress: number, idUser: number, address: Address): Observable<Address> {
        return this.httpClient.put<Address>(this.url + `address/update/${idAddress}/${idUser}`, address);
    }

    //Método que permite traer UNA dirección
    getAddress(idAddress: number): Observable<Address> {
        return this.httpClient.get<Address>(this.url + `address/${idAddress}`);
    }

    //Método que permite traer las direcciones por pais
    getAddressByCountry(idCountry: number): Observable<Address> {
        return this.httpClient.get<Address>(this.url + `address/all/${idCountry}`);
    }

    //Método que permite eliminar UNA dirección
    deleteAddress(idAddress: number): Observable<any> {
        return this.httpClient.delete(this.url + `address/delete/${idAddress}`);
    }

    //Método que permite traer UNA dirección
    getChanges(): Observable<Change> {
        return this.httpClient.get<Change>(this.url + `change/all`);
    }

    //Método que elimina todas las direcciones
    deleteAllAddress() {
        return this.httpClient.get(this.url + `address/delete/all`);
    }

    //Método que permite crear o actualizar direcciones mediante un archivo
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

    //Método que permite cerrar sesión
    logout() {
        localStorage.clear();
    }
}