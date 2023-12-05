import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';
import { CardDirective } from './directives/card.directive';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { PokemonTypeColor } from './pipes/pokemon-type-color';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from './auth/auth.guard';

const pokemonRoute: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemons', component: ListPokemonComponent },
  { path: 'pokemon/:id', component: DetailsPokemonComponent },
];

@NgModule({
  declarations: [
    CardDirective,
    PokemonTypeColor,
    ListPokemonComponent,
    DetailsPokemonComponent,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoute)
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
