import { Component, OnInit } from '@angular/core';
import { 
  Observable, 
  Subject, 
  debounceTime, 
  distinctUntilChanged, 
  switchMap 
} from 'rxjs';
import { Pokemon } from '../modeles/model-pokemons';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html'
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$!: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // Stocke un resultat semblable a celui-ci:
      // {..."a"."ab"..."abx"..."ab...."abc"......}

      debounceTime(300),
      // gardera { ...."ab"...."ab"...."abc"}

      distinctUntilChanged(),
      // Qui va filtrer et ne laisser que {...."ab"...."abc".....}

      // requete a la base de donnees
      // Possibilité d'utiliser concatMap / mergeMap / switchMap
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // renvoie {.....pokemonList(ab)........pokemonList(abc).......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
