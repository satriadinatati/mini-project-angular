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
import { PokemonCartComponent } from './feature/pokemon/pokemon-cart/pokemon-cart.component';
import { PokemonFormBuyComponent } from './feature/pokemon/pokemon-form-buy/pokemon-form-buy.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // pages with layout
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BiodataComponent },
      { path: 'pokemon', component: PokemonListComponent },
      { path: 'pokemon/:id', component: PokemonDetailPageComponent },
      { path: "list-buy", component: PokemonBuyListComponent },
      { path: "list-buy/edit/:id", component: PokemonFormBuyEditComponent, canDeactivate: [CanDeactivateGuard] },
      { path: "cart", component: PokemonCartComponent },
      { path: "cart/checkout", component: PokemonFormBuyComponent }
    ]

  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
