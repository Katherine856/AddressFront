import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { delay } from 'rxjs';
import { Server } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-item-address',
  templateUrl: './item-address.component.html',
  styleUrls: ['./item-address.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ItemAddressComponent {

  @Input() name!: String;
  @Input() address!: any;

  @Output() itemDelete = new EventEmitter<void>();

  typeRol = JSON.parse(localStorage.getItem('type') || '{}');

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private servidor: Server, private cd: ChangeDetectorRef) {
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  edit() {
    this.router.navigate(['/edit', this.address.idAddress]);
  }

  delete() {
    this.servidor.deleteAddress(this.address.idAddress).subscribe(data => {
      this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmado', detail: 'La dirección fue eliminada con exito' });
      setTimeout(()=>{
        this.itemDelete.emit();
      }, 1000);
    }, error => {
      this.messageService.add({ key: 'topright', severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' });
    })
  }

  confirm1() {
    this.confirmationService.confirm({
      accept: () => {
        this.delete()
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
}
