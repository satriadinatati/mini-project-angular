import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './feature/biodata/biodata.component';
import { PokemonListComponent } from './feature/pokemon/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {path: '', component: BiodataComponent},
  {path: 'pokemon', component: PokemonListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
