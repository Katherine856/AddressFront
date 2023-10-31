import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Service } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.scss'],
  providers: [MessageService]
})
export class BulkLoadComponent {

  file: File; //Archivo
  corret: any; //Exito de la transacción
  selectedFileName: string = ''; //Nombre del archivo seleccionado
  visible: boolean = false; //Visivilizar la información de la estructura del archivo

  constructor(private messageService: MessageService, private router: Router, private server: Service) { }

  //Subida del archivo
  onUpload(event: any) {

    this.file = event.target.files[0]; //Asignar el archivo a la variable

    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.selectedFileName = `Archivo seleccionado: ${fileInput.files[0].name}`; //Mostrar el nombre del archivo subido
    } else {
      this.selectedFileName = '';
    }

    //Confirmar la subida del archivo
    this.messageService.add({
      key: 'topright',
      severity: 'info',
      summary: 'File Uploaded',
      detail: 'File uploaded successfully',
    });
  }

  showDialog() {
    this.visible = true;
  }

  //Guardar el archivo
  save() {
    this.server.upload(this.file).subscribe(data => {
      this.corret = data
    })
    if(this.corret){
      this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'Transacción exitosa' });
    }
  }

  return() {
    this.router.navigate(['/home']);
  }
}
