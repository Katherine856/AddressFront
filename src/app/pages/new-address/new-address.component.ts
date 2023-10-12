import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface City {
  name?: string | null;
  code?: string | null;
}

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})

export class NewAddressComponent {

  value: string | undefined;
  cities: City[] | undefined;

  selectedCity: City | undefined;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      country: ['', [Validators.required]],
      division: ['', Validators.required],
      address: ['', [Validators.required]],
      residential: ['', [Validators.required]],
      building: ['', [Validators.required]],
      tower: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      floor: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      apartment: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      georeference: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  crear(){
    this.formGroup.reset()
  }
}