import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormBuyEditComponent } from './pokemon-form-buy-edit.component';

describe('PokemonFormBuyEditComponent', () => {
  let component: PokemonFormBuyEditComponent;
  let fixture: ComponentFixture<PokemonFormBuyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonFormBuyEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFormBuyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
