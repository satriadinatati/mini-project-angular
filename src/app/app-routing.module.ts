import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './feature/biodata/biodata.component';
import { PokemonListComponent } from './feature/pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailPageComponent } from './feature/pokemon/pokemon-detail-page/pokemon-detail-page.component';
import { PokemonBuyListComponent } from './feature/pokemon/pokemon-buy-list/pokemon-buy-list.component';
import { PokemonFormBuyEditComponent } from './feature/pokemon/pokemon-form-buy-edit/pokemon-form-buy-edit.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { AppLayoutComponent } from './layouts/app.layout/app.layout.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import path from 'path';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // pages with layout
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: BiodataComponent, canActivate: [AuthGuard] },
      { path: 'pokemon', component: PokemonListComponent, canActivate: [AuthGuard] },
      { path: 'pokemon/:id', component: PokemonDetailPageComponent, canActivate: [AuthGuard] },
      { path: "list-buy", component: PokemonBuyListComponent, canActivate: [AuthGuard] },
      { path: "list-buy/edit/:id", component: PokemonFormBuyEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] }
    ]

  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
