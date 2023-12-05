import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
     <div class='center'>
      <div class="card">
        <div class="card-body">
        <img src="../../assets/img/404.png"/>
        <h4>Hey, cette page n'existe pas !</h4>
        <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
          Retourner à l' accueil
        </a>
      </div>
    </div>
    </div>
    </div>
`
})
export class PageNotFoundComponent {

}
