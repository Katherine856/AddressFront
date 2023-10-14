import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

interface City {
  name?: string | null;
  code?: string | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  
  @Input() type!: string;

  value: string | undefined;
  cities: City[] | undefined;
  selectedCity: City | undefined;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) {
    this.formGroup = fb.group({
      country: ['', [Validators.required]],
      division: ['', Validators.required],
      address: ['', [Validators.required]],
      residential: ['', []],
      building: ['', []],
      tower: ['', [Validators.minLength(1), Validators.maxLength(1)]],
      floor: [null, [Validators.minLength(2), Validators.maxLength(2)]],
      apartment: [null, [Validators.minLength(1), Validators.maxLength(4)]],
      georeference: ['', [Validators.required]],
      products: ['', [Validators.required]],
      services: ['', [Validators.required]]
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


  crear() {
    this.formGroup.reset()
  }

  confirm1() {
    this.confirmationService.confirm({
      accept: () => {
        this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
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
