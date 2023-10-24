import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class EditComponent implements OnInit{

  idAddress: any;
  constructor(private activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.idAddress = this.activateRoute.snapshot.paramMap.get('id');
  }
}
