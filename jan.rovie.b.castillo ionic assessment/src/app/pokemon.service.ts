import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from './pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {

constructor(private http: HttpClient) { }

    getGenerationList(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>("https://pokeapi.co/api/v2/generation/")
        .pipe(map(data=> data['results'] || []));
    };

    getPokemonListByGeneration(url): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(url)
        .pipe(map(data=> data['pokemon_species']));
    };

    getPokemon(url): Observable<Pokemon> {
        return this.http.get<Pokemon>(url)
        .pipe(tap(_ => _));
    };
    // getPokemon(): Observable<Pokemon[]> {
    //     return this.http.get<Pokemon[]>(environment.apiUrl)
    //       .pipe(
    //         tap(_ => console.log('fetched PokemonList')),
    //         catchError(this.handleError<Pokemon[]>('getPokemon', []))
    //       );
    //   }

    //   private handleError<T>(operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {
    
    //       console.error(operation + ": "+ error);
    //       return of(result as T);
    //     };
    //   }


}