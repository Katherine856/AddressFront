import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const typeRol = JSON.parse(localStorage.getItem('type') || '{}');
  const expected = route.data
  let rol = false;

  for(let i in expected){
    for(let j in expected[i]){
      if(typeRol == expected[i][j]){
        rol = true;
        break;
      }
    }
  }

  if(rol == true){
    return true
  }else{
    router.navigate(['']);
    return false
  }

  return true;
};
