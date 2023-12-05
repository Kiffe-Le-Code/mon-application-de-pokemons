import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../modeles/model-pokemons';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html'
})
export class DetailsPokemonComponent implements OnInit {
  pokemon!: Pokemon[]; // modele des pokemons
  currentPokemon: Pokemon|undefined; // On peut trouver un pokemon ou non

  // Injection de pokemon service
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonService: PokemonService
  ) {}


  ngOnInit(): void {
    // this.pokemon = POKEMONS; Plus important avec le service
    // 1ere chose: on recupere l'id du pokemon selection
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');

    // cas ou il y'a un pokemon
    if(pokemonId) {
      // this.currentPokemon = this.pokemon.find(currentPokemon => currentPokemon.id == +pokemonId)
      // Avec les services et les http
      // this.currentPokemon = this.pokemonService.getPokemonById(+pokemonId);
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(currentPokemon => this.currentPokemon = currentPokemon);
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
