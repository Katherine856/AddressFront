import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Server } from 'src/app/share/server/server.service';
import { Credentials } from 'src/app/share/models/credentials';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  formGroup!: FormGroup;
  user: any;
  messages: Message[];

  constructor(private fb: FormBuilder, private router: Router, private server: Server) {
    this.formGroup = fb.group({
      user: [null, [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ingresar(){
    const credentials: Credentials = {
      idUser: this.formGroup.value.user,
      password: this.formGroup.value.password
    }

    this.server.login(credentials).subscribe(data => {
      if(data!=null){
        this.user = data
        localStorage.setItem('user', JSON.stringify(this.user.idUser));
        localStorage.setItem('type', JSON.stringify(this.user.typeUser));
        this.router.navigate(['/home']);
      }else{
        this.messages = [{ key: 'topright', severity: 'error', summary: '', detail: 'Contraseña y/o usuario incorrecto' }];
      }
    }, error =>{
      this.messages = [{ key: 'topright', severity: 'error', summary: '', detail: 'Contraseña y/o usuario incorrecto' }];
    }); 
  }
}
