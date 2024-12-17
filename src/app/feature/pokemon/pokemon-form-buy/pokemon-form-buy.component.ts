import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RealtimeDatabaseService } from '../../../services/realtime-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form-buy',
  standalone: false,
  
  templateUrl: './pokemon-form-buy.component.html',
  styleUrl: './pokemon-form-buy.component.css'
})
export class PokemonFormBuyComponent {
  @Input() pokemon: any = null;
  @Input() evolutions: any[] = [];
  @Output() closeBuyForm = new EventEmitter<void>();

  id: string | null = null;

  constructor(private realtimeDb: RealtimeDatabaseService, private router: Router){}

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

  async onSubmit(){
    this.buyForm.markAllAsTouched();
    console.log(this.buyForm.value);
    if(this.buyForm.invalid){
      return;
    }
    if(this.buyForm.controls['buyOption'].value === 'current'){
      this.buyForm.controls['pokemonToBuy'].setValue([this.pokemon.name]); 
    }else{
      const allPokemonNames = this.evolutions.map(evo => evo.species?.name || evo.name); 
      this.buyForm.controls['pokemonToBuy'].setValue(allPokemonNames);
    }
    await this.realtimeDb.saveFormSubmission(this.buyForm.value);
    this.buyForm.reset();
    this.router.navigate(['/list-buy']);
  }

  closeForm(){
    this.closeBuyForm.emit();
  }
}
