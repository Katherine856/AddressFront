import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router); 
  const typeRol = JSON.parse(localStorage.getItem('type') || '{}'); //Tipo de usuario
  const expected = route.data //Ver que usuarios tienen acceso a la ruta
  let rol = false; //Guardar si el rol coincide con uno con acceso

  for(let i in expected){
    for(let j in expected[i]){
      if(typeRol == expected[i][j]){
        rol = true;
        break;
      }
    }
  }

  //Si el rol coincide dar acceso y si no redirige al login
  if(rol == true){
    return true
  }else{
    router.navigate(['']);
    return false
  }

  return true;
};
