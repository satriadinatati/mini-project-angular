import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailPageComponent } from './pokemon-detail-page/pokemon-detail-page.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonDetailPageComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
