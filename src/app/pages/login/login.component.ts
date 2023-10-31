import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/app/share/server/server.service';
import { Credentials } from 'src/app/share/models/credentials';
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

  errorMessages = {
    user: {
      required: 'El campo usuario es obligatorio.',
    },
    password: {
      required: 'El campo contraseña es obligatorio.',
      minlength: 'La contraseña debe tener al menos 1 carácter.',
      maxlength: 'La contraseña no puede tener más de 16 caracteres.',
    },
  };

  constructor(private fb: FormBuilder, private router: Router, private service: Service) {
    this.formGroup = fb.group({
      user: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
    });
  }

  ingresar(){

    //Guardar credenciales para el inicio de sesión
    const credentials: Credentials = {
      idUser: this.formGroup.value.user,
      password: this.formGroup.value.password
    }

    //Verificar que las credenciales existan en la base de datos
    this.service.login(credentials).subscribe(data => {
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
