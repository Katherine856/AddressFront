import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast'; 
import { MenubarModule } from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';

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
    CardModule,
    MultiSelectModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    ToastModule,
    MenubarModule,
    FileUploadModule
  ], 
  exports:[
    CommonModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ToolbarModule,
    CardModule,
    MultiSelectModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    ToastModule,
    MenubarModule,
    FileUploadModule
  ]
})
export class PrimeModule { }
