import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBuyListComponent } from './pokemon-buy-list.component';

describe('PokemonBuyListComponent', () => {
  let component: PokemonBuyListComponent;
  let fixture: ComponentFixture<PokemonBuyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonBuyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
