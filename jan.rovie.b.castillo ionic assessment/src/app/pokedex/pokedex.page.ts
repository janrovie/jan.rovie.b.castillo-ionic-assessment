import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  generationList: Pokemon[];
  pokemonList: Pokemon[];
  
  selectedGeneration: String;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this.getGenerationList();
  }

  getGenerationList(): void{
    this.pokemonService.getGenerationList()
      .subscribe(results => 
       {
        this.generationList = results;
        console.log(this.generationList);
      });
  }

  getPokemonListByGeneration(): void {

    const generation = this.generationList.find(gen => gen.name === this.selectedGeneration);

    this.pokemonService.getPokemonListByGeneration(generation.url)
      .subscribe(results => 
       {
        this.pokemonList =results;
        console.log(this.pokemonList);       
      });
  }

  showPokemonDetail(pokemon: Pokemon): void {
    console.log(pokemon);  
    this.router.navigate(['/pokemon'], { state: { data: {pokemon: pokemon, pokemonList: this.pokemonList} } });
  }
}
