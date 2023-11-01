import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  idAddress: any;
  constructor(private activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.idAddress = this.activateRoute.snapshot.paramMap.get('id'); //Traer el id de la dirección
  }
}
