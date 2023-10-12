import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'new-address', component: NewAddressComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
