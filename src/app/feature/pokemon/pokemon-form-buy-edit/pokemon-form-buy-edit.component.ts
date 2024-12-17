import { Component } from '@angular/core';
import { RealtimeDatabaseService } from '../../../services/realtime-database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-form-buy-edit',
  standalone: false,
  
  templateUrl: './pokemon-form-buy-edit.component.html',
  styleUrl: './pokemon-form-buy-edit.component.css'
})
export class PokemonFormBuyEditComponent {
  id: string | null = null;
  pokemons: any[] = [];

  constructor(
    private realtimeDb: RealtimeDatabaseService, 
    private router: Router, 
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ){}

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

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == null) {
      return;
    }
    this.realtimeDb.getFormSubmission(this.id).then((data) => {
      console.log('PokemonFormBuyComponent: ngOnInit called', data);
      this.buyForm.patchValue(data);

      data.pokemonToBuy.forEach(async (pokemonName: string) => {
        this.pokemons.push(await this.pokemonService.getPokemonByName(pokemonName));
      });

    });
  }

  async onSubmit(){
    this.buyForm.markAllAsTouched();
    console.log(this.buyForm.value);
    if(this.buyForm.invalid){
      return;
    }
    await this.realtimeDb.updateFormSubmission(this.id!, this.buyForm.value);
    this.buyForm.reset();
    this.router.navigate(['/list-buy']);
  }

}
