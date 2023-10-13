import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-item-address',
  templateUrl: './item-address.component.html',
  styleUrls: ['./item-address.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ItemAddressComponent {

  @Input() name!: String;

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService){

  }

  edit(){
    this.router.navigate(['/edit']);
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
}
