export class Pokemon {
  // id!: number;
  // hp!: number;
  // cp!: number;
  // name!: string;
  // picture!: string;
  // types!: Array<string>;
  // created!: Date; ******** Avant le composant d'ajout de pokemon

  // elle devient une vraie classe
  id!: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: string[];
  created: Date;

  constructor(
    name: string = "Entrer un nom...",
    hp: number = 100,
    cp: number = 10,
    // picture: string = "../../assets/img/xxx.png",
    picture: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png",
    types: string[] = ['normal'],
    created: Date = new Date()
  ) {
    this.name = name;
    this.hp = hp;
    this.cp = cp;
    this.picture = picture;
    this.types = types;
    this.created = created;
  }

}
