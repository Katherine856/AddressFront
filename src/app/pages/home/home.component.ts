import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  names: string[];

  constructor(private router: Router){
    this.names = ['Hola', 'Como', 'Estas?']
  }

  new(){
    this.router.navigate(['/new-address']);
  }

  load(){
    this.router.navigate(['/bulk-load']);
  }
}
