import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Server } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, public server: Server){

  }

  back(){
    this.server.logout();
    this.router.navigate(['/']);
  }

}
