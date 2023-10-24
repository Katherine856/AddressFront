import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Server } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  names: string[];

  addresses: any;

  constructor(private router: Router, private server: Server){
    this.names = ['Hola', 'Como', 'Estas?']
  }

  ngOnInit(): void {
    this.getAddress()
  }

  new(){
    this.router.navigate(['/new-address']);
  }

  load(){
    this.router.navigate(['/bulk-load']);
  }

  getAddress() {
    this.server.getAddresses().subscribe(data => {
      this.addresses = data;
    })
  }
}
