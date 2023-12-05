import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../modeles/model-pokemons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  pokemonType!: string[];
  isAddForm!: boolean;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    // recupere les types des pokemons a l'initialisation
    this.pokemonType = this.pokemonService.getPokemonTypeList();

    // On initialise isAddForm avec add
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  // Au cas ou l'utilisateur coche ou decoche un pokemon
  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      this.pokemon.types.push(type);
    }else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  // regle de validation personnelle pour le type de pokemon
  isTypesValid(type: string): boolean {

    // si le pokemon n'a qu'un seul type et que je suis en train de travailler sur le type courant
    // alors, on empeche l'utilisateur de décocher la case
    if(this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }

    // si le pokemon a plus de deux type et qu'on n'est pas sur le type courant
    // alors, on empeche l'utilisateur de décocher la case
    if(this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    // console.log('Formulaire soumis avec succes');
    // this.router.navigate(['/pokemon', this.pokemon.id]);
    
    // On utilise le service et les requetes http    
    // this.pokemonService.updatePokemon(this.pokemon)
    //   .subscribe((pokemon) => {
    //     if(pokemon) {
    //       this.router.navigate(['/pokemon', pokemon.id]);
    //     }
    //   })

    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
      .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
    } else {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
    }
    
  }
}
