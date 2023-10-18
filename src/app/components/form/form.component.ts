import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Address } from 'src/app/share/models/address';
import { Country } from 'src/app/share/models/country';
import { Servidor } from 'src/app/share/server/server';

interface City {
  name?: string | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() type!: string;

  value: string | undefined;
  country: any;
  geoDiv: any;
  products: any;
  services: any;

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router, private servidor: Servidor) {
    this.formGroup = fb.group({
      country: ['', [Validators.required]],
      division: ['', Validators.required],
      address: ['', [Validators.required]],
      residential: [null, []],
      building: [null, []],
      tower: [null, [Validators.minLength(1), Validators.maxLength(1)]],
      floor: [null, [Validators.minLength(2), Validators.maxLength(2)]],
      apartment: [null, [Validators.minLength(1), Validators.maxLength(4)]],
      products: ['', [Validators.required]],
      services: ['', [Validators.required]]
    });


  }

  ngOnInit() {

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

  crear() {

  }

  create() {
    const address: Address = {
      idAddress: null,
      geographicalDivision: {
        idGeographicalDivision: this.formGroup.value.division.idGeographicalDivision,
        nameGeographicalDivision: null,
        timeZone: null,
        country: null
      },
      infoAddress: this.formGroup.value.address,
      latitude: 10,
      longitude: 20,
      residential: this.formGroup.value.residential,
      building: this.formGroup.value.building,
      tower: this.formGroup.value.tower,
      floor: this.formGroup.value.floor,
      apartment: this.formGroup.value.apartment,
      product_service: [
        this.formGroup.value.products.concat(this.formGroup.value.services)
      ]
    }
    console.log(address)
  }

  confirm1() {
    this.confirmationService.confirm({
      accept: () => {
        this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this.create()
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ key: 'topright', severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'topright', severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  return() {
    this.router.navigate(['/home']);
  }
}
