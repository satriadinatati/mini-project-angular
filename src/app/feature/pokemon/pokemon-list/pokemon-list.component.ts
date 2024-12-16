import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,
  
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnChanges {

  result_pokemon: any;
  pokemonList: any[] = [];

  filteredPokemon: any[] = [];
  paginatedPokemon: any[] = [];
  selectedPokemon: any = null;
  theme: 'light' | 'dark' = 'light';
  filter: string = '';
  selectedElement: string = '';
  elements: string[] = ['fire', 'water', 'grass', 'electric', 'ice', 'rock'];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  toChild: string = "";
  totalPokemon: number = 20;
  isDisabledPrev: boolean = true;
  searchPokemonName: string = "";

  constructor(private pokemonService: PokemonService){};

  async ngOnInit() {
    console.log('PokemonListComponent: ngOnInit called');
    await this.fetchPokemon();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('PokemonListComponent: ngOnChanges called', changes);
  }

  ngOnDestroy() {
    console.log('PokemonListComponent: ngOnDestroy called');
  }

  setLimit(){
    console.log(this.totalPokemon);
  }

  onTotalPokemonChange(event: any){
    this.totalPokemon = event.target.value;
  }

  onNameChange(event: any){
    this.searchPokemonName = event.target.value;
  }

  async getPokemonByName(){
    if (this.searchPokemonName !== ""){
      const response = await this.pokemonService.getPokemonByName(this.searchPokemonName);
      this.filteredPokemon = [
        {
          name: response.name,
          image: response.sprites.front_default,
          element: response.types[0]?.type?.name
        }
      ]
      this.totalPokemon = 1;
      this.currentPage = 1;
      this.updatePagination()
    }
  }

  async fetchPokemon() {
    const rawPokemonList = await this.pokemonService.getPokemonList(this.totalPokemon); // Fetch first 150 Pokémon
    this.pokemonList = await Promise.all(
      rawPokemonList.map(async (pokemon: any) => {
        const details = await this.pokemonService.getPokemonDetails(
          pokemon.url
        );
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: details.sprites.front_default,
          element: details.types[0]?.type?.name, // Assuming first type as element
        };
      })
    );
    this.filteredPokemon = this.pokemonList;
    this.currentPage = 1;
    this.updatePagination();
  }

  showDetail(pokemon: any){
    this.toChild = pokemon;
  }

  applyFilter() {
    this.filteredPokemon = this.pokemonList.filter((pokemon) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(this.filter.toLowerCase());
      const matchesElement =
        !this.selectedElement || pokemon.element === this.selectedElement;
      return matchesName && matchesElement;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(
      this.filteredPokemon.length / this.itemsPerPage
    );
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemon = this.filteredPokemon.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  async selectPokemon(url: string) {
    this.selectedPokemon = await this.pokemonService.getPokemonDetails(url);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
