import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, take } from 'rxjs';
import { Server } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  addresses: any;

  typeRol = JSON.parse(localStorage.getItem('type') || '{}');

  first: number = 0;

  rows: number = 10;

  constructor(private router: Router, private server: Server){
  }

  ngOnInit(): void {
    this.getAddress();
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

  refreshData(){
    this.getAddress();
  }

  paginate(event: any) {
    this.first = event.first;
    this.getAddress()
  }
  
}
