import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, public server: Service){

  }

  back(){
    this.server.logout();
    this.router.navigate(['/']);
  }

}
