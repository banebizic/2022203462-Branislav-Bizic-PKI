import { inject, Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static instance: MovieService

  private url = '/assets/data/spisakFilmova.json'
  private movies: MovieModel[] = []
  private client: HttpClient
  private constructor() {
    this.client = inject(HttpClient)
  }

  public static getInstance(): MovieService {
    if (MovieService.instance == null)
      MovieService.instance = new MovieService
    return MovieService.instance
  }

  public getMovies() {
    return this.client.get<MovieModel[]>(this.url, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  public getMovieById(id: number) {
    return this.client.get<MovieModel[]>(this.url, {
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(
      map(movies => movies.find(movie => movie.id === id))
    )

  }

  public getMovieByName(name: string) {
    return this.client.get<MovieModel[]>(this.url, {
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(
      map(movies => movies.find(movie => movie.naziv === name))
    )
  }

  public getMovieByZanr(zanr: string) {
    return this.client.get<MovieModel[]>(this.url, {
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(
      map(movies => movies.filter(movie => movie.zanr === zanr))
    )
  }

  public getMovieByCena(cena: number) {
    return this.client.get<MovieModel[]>(this.url, {
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(
      map(movies => movies.filter(movie => movie.projekcije[0].cena === cena))
    )
  }

  public saveBookedMovie(id: number) {
    sessionStorage.setItem('book', JSON.stringify(id))
  }
}
