import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailPageComponent } from './pokemon-detail-page/pokemon-detail-page.component';
import { PokemonFormBuyComponent } from './pokemon-form-buy/pokemon-form-buy.component';
import { PokemonBuyListComponent } from './pokemon-buy-list/pokemon-buy-list.component';
import { PokemonFormBuyEditComponent } from './pokemon-form-buy-edit/pokemon-form-buy-edit.component';
import { PokemonCartComponent } from './pokemon-cart/pokemon-cart.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonDetailPageComponent,
    PokemonFormBuyComponent,
    PokemonBuyListComponent,
    PokemonFormBuyEditComponent,
    PokemonCartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
