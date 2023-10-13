import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.scss'],
  providers: [MessageService]
})
export class BulkLoadComponent {
    constructor(private messageService: MessageService, private router: Router) {}

    onBasicUploadAuto(event: any) {
      if ( event.files.length >0 ){
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file',file);
      }
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }

  return(){
    this.router.navigate(['/home']);
  }
}
