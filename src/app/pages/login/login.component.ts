import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = fb.group({
      user: [null, [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ingresar(){
    this.router.navigate(['/home']);
  }
}
