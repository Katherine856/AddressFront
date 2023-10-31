import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Address } from 'src/app/share/models/address';
import { Service } from 'src/app/share/server/server.service';

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

  errorMessages = {
    country: {
      required: 'El campo país es obligatorio.',
    },
    division: {
      required: 'El campo división es obligatorio.',
    },
    address: {
      required: 'El campo dirección es obligatorio.',
    },
    tower: {
      minlength: 'La torre debe tener al menos 1 carácter.',
      maxlength: 'La torre no puede tener más de 1 carácter.',
    },
    floor: {
      minlength: 'El piso debe tener al menos 1 carácter.',
      maxlength: 'El piso no puede tener más de 2 caracteres.',
    },
    apartment: {
      minlength: 'El apartamento debe tener al menos 1 carácter.',
      maxlength: 'El apartamento no puede tener más de 4 caracteres.',
    }
  };

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router, private servidor: Service) {
    this.formGroup = this.fb.group({
      country: ['', [Validators.required]],
      division: ['', Validators.required],
      address: ['', [Validators.required]],
      residential: [null, []],
      building: [null, []],
      tower: [null, [Validators.minLength(1), Validators.maxLength(1)]],
      floor: [null, [Validators.minLength(1), Validators.maxLength(2)]],
      apartment: [null, [Validators.minLength(1), Validators.maxLength(4)]],
      products: ['', []],
      services: ['', []]
    });
  }

  ngOnInit() {

    this.getCountrys(); 

    this.getProducts();

    this.getServices();

    this.formGroup.controls["country"].valueChanges.subscribe(data => {
      this.getGeoDiv(data.idCountry); //Traer la division geografica según el pais seleccionado
    });

  }

  //Método que trae todos los paises para inicializar las opciones del formulario
  getCountrys() {
    this.servidor.getCountrys().subscribe(data => {
      this.country = data;
    })
  }

  //Método que trae toda la división geografica según el pais seleccionado
  getGeoDiv(id_Country: number) {
    this.servidor.getGeoDiv(id_Country || 170).subscribe(data => {
      this.geoDiv = data;
    })
  }

  //Método que trae todos los productos para elegir
  getProducts() {
    this.servidor.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  //Método que trae todos los servicios para elegir
  getServices() {
    this.servidor.getServices().subscribe(data => {
      this.services = data;
    })
  }

  //Envia los datos de latitud al componente maps
  receiveLat(lat: number) {
    this.lat = lat;
  }

  //Envia los datos de longitud al componente maps
  receiveLng(lng: number) {
    this.lng = lng;
  }

  //Método que enviar el formulario con los datos de la dirección a crear o actualizar
  send() {

    //Se crea el objeto con la información del formulario
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

    //Se realiza la opción indicada de acuerdo a el tipo de formulario
    if (this.type == 'Añadir'){
      this.create(address)
    }else{
      if(this.id != null){
        this.update(address, this.id)
      }
    }
  } 

  //Médoto que permite crear una dirección
  create(address: Address ){
    this.servidor.createAddress(address).subscribe(
      data => {
        this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmación', detail: 'Transacción exitosa' });
      }, error => {
        if (error.status != 201) {
          this.messageService.add({ key: 'topright', severity: 'error', summary: 'Error', detail: 'Algo salio mal, intelalo nuevamente' });
        }
        else {
          this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmación', detail: 'Transacción exitosa' });
        }
        
      })
  }

  //Médoto que permite actualizar una dirección
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

  //Método que trae una dirección para inicializar los valores del formulario
  getAddress( id: number){
    this.servidor.getAddress(id).subscribe(
      data => {
        this.addressActualy = data;
        this.formGroup.setValue({
          country: this.addressActualy.geographicalDivision.country,
          division: this.addressActualy.geographicalDivision,
          address: this.addressActualy.infoAddress,
          residential: this.addressActualy.residential,
          building: this.addressActualy.building,
          tower: this.addressActualy.tower,
          floor: this.addressActualy.floor,
          apartment: this.addressActualy.apartment,
          products: '',
          services: '',
        })
      })
  }

  confirm() {
    this.confirmationService.confirm({
      accept: () => {
        this.send()
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ key: 'topright', severity: 'error', summary: 'Error', detail: 'Algo salio mal, intentalo nuevamente' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'topright', severity: 'warn', summary: 'Cancelada', detail: 'Transacción cancelada' });
            break;
        }
      }
    });
  }

  return() {
    this.router.navigate(['/home']);
  }
}
