import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RealtimeDatabaseService } from '../../../services/realtime-database.service';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../../state/cart/cart-selector';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-form-buy',
  standalone: false,
  templateUrl: './pokemon-form-buy.component.html',
  styleUrls: ['./pokemon-form-buy.component.css'] // Perbaikan 'styleUrl' menjadi 'styleUrls'
})
export class PokemonFormBuyComponent implements OnInit {
  // Tentukan tipe data lebih jelas
  selectedPokemons: { pokemon: any, quantity: number, evolutions?: any[] }[] = [];

  id: string | null = null;

  constructor(
    private realtimeDb: RealtimeDatabaseService,
    private router: Router,
    private store: Store,
    private pokemonService: PokemonService
  ) {}

  async ngOnInit() {
    await this.getFromStore();
    console.log('Selected Pokemons:', this.selectedPokemons);
  }

  countryCode = [
    { code: '+62', name: 'ID' },
    { code: '+1', name: 'US' }
  ];

  buyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.min(0)]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneCountryCode: new FormControl('+62', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    buyOption: new FormControl('current', [Validators.required]),
    pokemonToBuy: new FormControl<string[]>([])
  });

  async onSubmit() {
    this.buyForm.markAllAsTouched();
    console.log(this.buyForm.value);
    if (this.buyForm.invalid) {
      return;
    }
    await this.realtimeDb.saveFormSubmission(this.buyForm.value);
    this.buyForm.reset();
    this.router.navigate(['/list-buy']);
  }

  /**
   * Mengambil rantai evolusi untuk semua Pokémon dalam daftar
   */
  async getFromStore() {
    try {
      const items = this.store.select(selectCartItems);
      items.subscribe(async (data) => {
        this.selectedPokemons = data;

        // Menggunakan Promise.all agar semua request dilakukan secara paralel
        const updatedPokemons = await Promise.all(
          this.selectedPokemons.map(async (item: any) => {
            const evolutions = await this.pokemonService.getPokemonEvolutionChain(item.pokemon.id);
            // Tambahkan properti evolutions ke setiap Pokémon
            return { ...item, evolutions };
          })
        );

        // Perbarui selectedPokemons dengan Pokémon yang memiliki evolusi
        this.selectedPokemons = updatedPokemons;

        // Mengatur daftar Pokémon yang dipilih ke dalam FormControl
        this.buyForm.controls['pokemonToBuy'].setValue(
          this.selectedPokemons.map(item => item.pokemon.name)
        );

        console.log('Updated Pokemons with Evolutions:', this.selectedPokemons);
      });
    } catch (error) {
      console.error('Error fetching items from store:', error);
    }
  }
}
