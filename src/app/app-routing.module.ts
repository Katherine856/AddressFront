import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';
import { BulkLoadComponent } from './pages/bulk-load/bulk-load.component';
import { roleGuardGuard } from './share/guard/role-guard.guard';

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [roleGuardGuard], data: {expectedRoles:['Administrador', 'Cliente']}}, 
  {path: 'new-address', component: NewAddressComponent, canActivate: [roleGuardGuard], data: {expectedRoles:['Administrador', 'Cliente']}},
  {path: 'edit/:id', component: EditComponent, canActivate: [roleGuardGuard], data: {expectedRoles:['Administrador', 'Cliente']}},
  {path: 'bulk-load', component: BulkLoadComponent, canActivate: [roleGuardGuard], data: {expectedRoles:['Administrador']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
