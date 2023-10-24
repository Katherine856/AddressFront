import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Server } from 'src/app/share/server/server.service';
import { Message } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.scss'],
  providers: [MessageService]
})
export class BulkLoadComponent {

  file: File;
  corret: any;
  selectedFileName: string = '';

  constructor(private messageService: MessageService, private router: Router, private server: Server) { }

  onUpload(event: any) {

    this.file = event.target.files[0];

    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.selectedFileName = `Archivo seleccionado: ${fileInput.files[0].name}`;
    } else {
      this.selectedFileName = '';
    }
    this.messageService.add({
      key: 'topright',
      severity: 'info',
      summary: 'File Uploaded',
      detail: 'File uploaded successfully',
    });
  }

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
