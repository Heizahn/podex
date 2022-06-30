import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';
  pokemonHabilidad= [];
  pokemonLife = [];
  pokemonHeight = '';
  pokemonEXP = [];

  constructor(private pokemonService: PokemonService,private activateRouter: ActivatedRoute) { 
    this.activateRouter.params.subscribe(
      pararams => {
        this.getPokemon(pararams['id']);
      }
    );
  }

  ngOnInit(): void {
  }

  getPokemon(id: any){
    this.pokemonService.getPokemons(id).subscribe(
      respuesta => {
        console.log(respuesta)
        this.pokemon = respuesta;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = respuesta.types[0].type.name;
        this.pokemonLife = respuesta.stats[0].base_stat;
        this.pokemonHeight = this.pokemon.height;
        this.pokemonHabilidad = respuesta.abilities[0].ability.name;
        this.pokemonEXP = this.pokemon.base_experience;
      },
      error => {
        console.log(error)
      }
    );
  }
}
