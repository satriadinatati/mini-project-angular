// src/app/feature/pokemon/pokemon-detail-page/pokemon-detail-page.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: false,
  
  templateUrl: './pokemon-detail-page.component.html',
  styleUrl: './pokemon-detail-page.component.css'
})
export class PokemonDetailPageComponent implements OnInit {
  pokemon : any;
  pokemonId: string | null = null;
  evolutions: any[] = [];
  evoIndex = 0;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute){}

  async ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    if (!this.pokemonId) {
      return;
    }

    // get baby
    // if (this.pokemonId) {
    //   let babyPokemon = await this.pokemonService.getPokemonByName(this.pokemonId);
    //   this.evolutions.push(babyPokemon);
    //   this.pokemon = babyPokemon;
    // }

    // get species
    const pokemonDetail = await this.pokemonService.getPokemonByName(this.pokemonId);
    const pokemonSpecies = await this.pokemonService.getPokemonDetails(pokemonDetail.species.url);

    // get url evolution from species and get evolution
    const pokemonEvolution = await this.pokemonService.getPokemonEvolution(pokemonSpecies.evolution_chain.url);

    let pokemonDetails = await this.pokemonService.getPokemonByName(pokemonEvolution.chain.species.name);
    this.evolutions.push(pokemonDetails);
    await this.extractEvolution(pokemonEvolution.chain.evolves_to[0]);
    this.pokemon = await this.pokemonService.getPokemonByName(pokemonEvolution.chain.species.name);
    console.log("evolutions", this.evolutions);
  }

  async extractEvolution(evoDetail : any){
    if(evoDetail.evolves_to.length >= 0){
      let pokemonDetails = await this.pokemonService.getPokemonByName(evoDetail.species.name);
      this.evolutions.push(pokemonDetails);
      this.extractEvolution(evoDetail.evolves_to[0]);
    }
    return;
  }

  async evolvePokemon(){
    if(this.evoIndex < this.evolutions.length-1){
      this.evoIndex++;
      console.log(this.evoIndex);
      console.log(this.evolutions[this.evoIndex].name);
      this.pokemon = await this.pokemonService.getPokemonByName(this.evolutions[this.evoIndex].name);
    }
  }

  async devolvePokemon(){
    if(this.evoIndex >= 1){
      this.evoIndex--;
      console.log(this.evoIndex);
      console.log(this.evolutions[this.evoIndex].name);
      this.pokemon = await this.pokemonService.getPokemonByName(this.evolutions[this.evoIndex].name);
    }
  }

  playCry(){
    let audio = new Audio();
    audio.src = this.pokemon.cries.latest;
    audio.load();
    audio.play();
  }

}
