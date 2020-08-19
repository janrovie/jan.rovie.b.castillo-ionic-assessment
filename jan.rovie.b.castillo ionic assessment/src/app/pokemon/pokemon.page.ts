import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  pokemon: Pokemon;
  pokemonList: Pokemon[];
  pokemonSearchList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService,
              private router : Router) { }


  ngOnInit() {
    let data = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.data : '';
    this.pokemonList = data.pokemonList;
    console.log(this.pokemonList);
    this.getPokemon(data.pokemon);
  }

  getPokemon(pokemon: Pokemon){

    if(!pokemon){
      return;
    }

    this.pokemonService.getPokemon(pokemon.url)
      .subscribe(data => 
       {
        this.pokemonSearchList = [];
        this.pokemon = data;
        console.log(this.pokemon);
      });

  }

  getDescription(){

    if(this.pokemon && this.pokemon['flavor_text_entries']){
      let filteredText = this.pokemon['flavor_text_entries'].filter(text => text.language.name === "en");
      return filteredText && filteredText.length > 0 ? filteredText[0].flavor_text : '';
    }
  }

  searchPokemon(e) {

    let value = e ? e.target.value : '';

    if(!value) return;

    // this.getPokemon(this.queryText);

    this.pokemonSearchList = this.pokemonList.filter(pokemon => pokemon.name.includes(value.toLowerCase()))
    // window.history.replaceState({}, '', '/pokemons/1')
    //this.navCtrl.navigateForward('/pokemons/3');
    //this.router.navigateByUrl('/pokemons/1');

  }

  clearSearch(){
    this.pokemonSearchList = [];
  }


}
