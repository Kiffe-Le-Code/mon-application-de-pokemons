import { Injectable } from '@angular/core';
import { Pokemon } from './modeles/model-pokemons';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}

  // cette methode recupere la liste des pokemons
  // getPokemonList(): Pokemon[] {
  //   return POKEMONS;
  // }

  // ************** avec les requetes http *****************
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      // tap((pokemonList: any) => console.table(pokemonList)),
      tap((response: any) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      // tap((pokemon) => console.log(pokemon)),
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // Rechercher un pokemon selon un terme de revcherche
  searchPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length <=1) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  // requete PUT: editer un pokemon
  updatePokemon(pokemon: Pokemon): Observable<Pokemon|undefined> {
    const httOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put('api/pokemons', pokemon, httOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // supprimer un pokemon
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  // Ajouter un pokemon
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  // factoriser le code redondant
  private log(response: any) {
    console.table(response);
  }
  
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }



  // cette methode recupere un pokemon selon son id
  // getPokemonById(pokemonId: number): Pokemon|undefined {
  //   return POKEMONS.find(pokemon => pokemon.id == pokemonId);
  // }

  // renvoyer les types des pokemons
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ]
  }

}
