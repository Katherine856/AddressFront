import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ToolbarModule,
    CardModule
  ], 
  exports:[
    CommonModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ToolbarModule,
    CardModule
  ]
})
export class PrimeModule { }
