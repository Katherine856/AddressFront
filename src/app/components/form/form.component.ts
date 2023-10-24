import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Address } from 'src/app/share/models/address';
import { Server } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() type!: string;
  @Input() id!: number | null;

  lat: number;
  lng: number;
  country: any;
  geoDiv: any;
  products: any;
  services: any;
  addressActualy: any;

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router, private servidor: Server) {
    this.formGroup = this.fb.group({
      country: ['', [Validators.required]],
      division: ['', Validators.required],
      address: ['', [Validators.required]],
      residential: [null, []],
      building: [null, []],
      tower: [null, [Validators.minLength(1), Validators.maxLength(1)]],
      floor: [null, [Validators.minLength(1), Validators.maxLength(2)]],
      apartment: [null, [Validators.minLength(1), Validators.maxLength(4)]],
      products: ['', [Validators.required]],
      services: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.type == 'Añadir'){
      this.addressActualy = null;
    }else{
      if(this.id != null){
        this.getAddress(this.id)
      }
    }

    this.getCountrys()

    this.getProducts()

    this.getServices()

    this.formGroup.controls["country"].valueChanges.subscribe(data => {
      this.getGeoDiv(data.idCountry)
    });
  }

  getCountrys() {
    this.servidor.getCountrys().subscribe(data => {
      this.country = data;
    })
  }

  getGeoDiv(id_Country: number) {
    this.servidor.getGeoDiv(id_Country || 170).subscribe(data => {
      this.geoDiv = data;
    })
  }

  getProducts() {
    this.servidor.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  getServices() {
    this.servidor.getServices().subscribe(data => {
      this.services = data;
    })
  }

  receiveLat(lat: number) {
    this.lat = lat;
  }

  receiveLng(lng: number) {
    this.lng = lng;
  }

  send() {
    const address: Address = {
      idAddress: null,
      geographicalDivision: {
        idGeographicalDivision: this.formGroup.value.division.idGeographicalDivision,
        nameGeographicalDivision: null,
        timeZone: null,
        country: null
      },
      infoAddress: this.formGroup.value.address,
      latitude: this.lat,
      longitude: this.lng,
      residential: this.formGroup.value.residential,
      building: this.formGroup.value.building,
      tower: this.formGroup.value.tower,
      floor: this.formGroup.value.floor,
      apartment: this.formGroup.value.apartment,
      product_service: this.formGroup.value.products.concat(this.formGroup.value.services)
    }
    if (this.type == 'Añadir'){
      this.create(address)
    }else{
      if(this.id != null){
        this.update(address, this.id)
      }
    }
  } 

  create(address: Address ){
    this.servidor.createAddress(address).subscribe(
      data => {
        
      }, error => {
        if (error.status != 201) {
          this.messageService.add({ key: 'topright', severity: 'error', summary: 'Rejected', detail: 'Algo salio mal, intelalo nuevamente' });
        }
        else {
          this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'Transacción exitosa' });
        }
        
      })
  }

  update(address: Address, id: number){
    this.servidor.updateAddress(id, 12345, address).subscribe(
      data => {
        this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'Transacción exitosa' });
      }, error => {
        if (error.status != 201) {
          this.messageService.add({ key: 'topright', severity: 'error', summary: 'Rejected', detail: 'Algo salio mal, intelalo nuevamente' });
        }
        else {
          this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'Transacción exitosa' });
        }
        
      })
  }

  getAddress( id: number){
    this.servidor.getAddress(id).subscribe(
      data => {
        this.addressActualy = data;
      })
  }

  confirm1() {
    this.confirmationService.confirm({
      accept: () => {
        this.send()
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ key: 'topright', severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'topright', severity: 'warn', summary: 'Cancelled', detail: 'Transacción cancelada' });
            break;
        }
      }
    });
  }

  return() {
    this.router.navigate(['/home']);
  }
}
