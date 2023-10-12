import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-address',
  templateUrl: './item-address.component.html',
  styleUrls: ['./item-address.component.scss']
})
export class ItemAddressComponent {

  @Input() name!: String;

  constructor(){

  }
}
