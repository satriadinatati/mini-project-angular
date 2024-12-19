import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor() {
    console.log('PokemonService: Constructor called');
  }

  async getPokemonList(limit: number = 20) {
    const response = await axios.get(`${this.apiUrl}?limit=${limit}`);
    return response.data.results;
  }

  async getPokemonDetails(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async getPokemonByName(name: string) {
    const response = await axios.get(`${this.apiUrl}/${name}`);
    return response.data;
  }

  async getPokemonEvolution(url: string){
    const response = await axios.get(url);
    return response.data;
  }

  async getPokemonEvolutionChain(pokemonId: string): Promise<any[]> {
    let evolutions: any[] = [];
    
    try {
        // Step 1: Dapatkan detail Pokémon dan spesiesnya
        const pokemonDetail = await this.getPokemonByName(pokemonId);
        const pokemonSpecies = await this.getPokemonDetails(pokemonDetail.species.url);
        
        // Step 2: Dapatkan data rantai evolusi dari URL evolusi
        const pokemonEvolution = await this.getPokemonEvolution(pokemonSpecies.evolution_chain.url);

        // Step 3: Proses rantai evolusi
        await this.extractEvolutionChain(pokemonEvolution.chain, evolutions);

    } catch (error) {
        console.error('Error fetching evolution chain:', error);
    }

    console.log("Evolutions:", evolutions);
    return evolutions;
}

private async extractEvolutionChain(evoChain: any, evolutions: any[]): Promise<void> {
    if (!evoChain) return;

    try {
        // Tambahkan detail Pokémon ke dalam array evolusi
        const pokemonDetails = await this.getPokemonByName(evoChain.species.name);
        evolutions.push(pokemonDetails);

        // Jika terdapat evolusi berikutnya, panggil rekursif
        if (evoChain.evolves_to && evoChain.evolves_to.length > 0) {
            for (const nextEvolution of evoChain.evolves_to) {
                await this.extractEvolutionChain(nextEvolution, evolutions);
            }
        }
    } catch (error) {
        console.error('Error extracting evolution chain:', error);
    }
}


}
