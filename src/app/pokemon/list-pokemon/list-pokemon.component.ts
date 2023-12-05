import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../modeles/model-pokemons';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent implements OnInit {
  // pokemonList: Pokemon[] = POKEMONS; //Plus important avec l'utilisation des services
  
  // On a juste besoin du modele des pokemons
  pokemonList!: Pokemon[];

  // On instancie le service PokemonService
  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  // Puis on initialise la liste des pokemons dans ngOnInit()
  ngOnInit(): void {
    // Equivalent de pokemonList: Pokemon[] = POKEMONS; plus haut
    // this.pokemonList = this.pokemonService.getPokemonList(); On utilise maintenant les http
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['pokemon', pokemon.id]);
  }
}
