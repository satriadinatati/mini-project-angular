// src/app/feature/pokemon/pokemon-detail/pokemon-detail.component.ts

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,
  
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {
  @Input() pokemon: any = null;

  constructor(private router : Router){}

  goToDetail(pokemon: any){
    console.log('PokemonDetailComponent: getDetail called', pokemon);

    // Ekstraksi ID dari URL (Contoh URL: https://pokeapi.co/api/v2/pokemon/8/)
    const urlParts = pokemon.url.split('/');
    console.log(urlParts);
    const id = urlParts[urlParts.length - 2]; // ID adalah bagian sebelum "/" terakhir
    console.log(id);


    this.router.navigate(['/pokemon', id]);
  }
}
