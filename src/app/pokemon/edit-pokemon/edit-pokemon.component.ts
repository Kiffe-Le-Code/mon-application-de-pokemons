import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../modeles/model-pokemons';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture" alt="Picture of {{ pokemon.name }}">
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if(pokemonId) {
      // this.pokemon = this.pokemonService.getPokemonById(+pokemonId);
      
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);

    } else {
      this.pokemon = undefined;
    }
  }
}
