import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormBuyComponent } from './pokemon-form-buy.component';

describe('PokemonFormBuyComponent', () => {
  let component: PokemonFormBuyComponent;
  let fixture: ComponentFixture<PokemonFormBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonFormBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFormBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
