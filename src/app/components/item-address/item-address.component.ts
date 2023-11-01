import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Service } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-item-address',
  templateUrl: './item-address.component.html',
  styleUrls: ['./item-address.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ItemAddressComponent {

  @Input() address!: any;

  @Output() itemDelete = new EventEmitter<void>(); //Evento que actualiza el home

  typeRol = JSON.parse(localStorage.getItem('type') || '{}');

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private service: Service, private cd: ChangeDetectorRef) {
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  edit() {
    this.router.navigate(['/edit', this.address.idAddress]);
  }

  //Método que permite eliminar una dirección con su id
  delete() {
    this.service.deleteAddress(this.address.idAddress).subscribe(data => {
      this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmado', detail: 'La dirección fue eliminada con exito' });
      setTimeout(()=>{
        this.itemDelete.emit();
      }, 1000); //Poner un delay para que se vea el mensaje de confirmación
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
            this.messageService.add({ key: 'topright', severity: 'error', summary: 'Cancelada', detail: 'Transación cancelada' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'topright', severity: 'warn', summary: 'Error', detail: 'Hubo un error, intentalo nuevamente' });
            break;
        }
      }
    });
  }
}
