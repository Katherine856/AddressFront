import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
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

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private servidor: Server){
  }

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  edit(){
    this.router.navigate(['/edit', this.address.idAddress]);
  }

  delete(){
    this.servidor.deleteAddress(this.address.idAddress).subscribe(data => {
      this.messageService.add({ key: 'topright', severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
    }, error =>{
      this.messageService.add({ key: 'topright', severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
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
