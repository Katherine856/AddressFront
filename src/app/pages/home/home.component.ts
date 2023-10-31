import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  addresses: any = [];
  countrys: any;

  formGroup!: FormGroup;

  typeRol = JSON.parse(localStorage.getItem('type') || '{}');

  first: number = 0; //Página inicial
  rows: number = 10; //Cantidad de filas por página

  constructor(private fb: FormBuilder, private router: Router, private service: Service){
    this.formGroup = this.fb.group({
      country: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getCountrys();

    this.formGroup.controls["country"].valueChanges.subscribe(data => {
      if(data.idCountry === 0){
        this.getAddress(); //Se muestran todas
      }
      if(data.idCountry!==0){
        this.getAddressByCountry(data.idCountry); //Se filtran por pais
      }
    });
  }

  new(){
    this.router.navigate(['/new-address']);
  }

  load(){
    this.router.navigate(['/bulk-load']);
  }

  //Método que trae los paises y añade la opción de todos
  getCountrys() {
    this.service.getCountrys().subscribe(data => {
      this.countrys = data;
      this.countrys = [{idCountry: 0, nameCountry: 'Todas', format: '', image:''}, ...this.countrys];
    })
  }

  //Método que trae las direcciones por paises
  getAddressByCountry(idCountry: number){
    if(idCountry!){ //Se ejecuta el método si existe un pais
      this.service.getAddressByCountry(idCountry).subscribe(data => {
        this.addresses = data;
      })
    }
  }

  //Método que trae TODAS las direcciones
  getAddress() {
    this.service.getAddresses().subscribe(data => {
      this.addresses = data;
    })
  }

  //Método que actualiza la página cada que se elimina una dirección
  refreshData(){
    this.getAddress();
  }

  //Método que permite páginar las direcciones
  paginate(event: any) {
    this.first = event.first;
    this.getAddress();
  }
  
}
