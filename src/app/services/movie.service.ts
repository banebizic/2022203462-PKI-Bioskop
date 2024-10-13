import { inject, Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = '/assets/data/spisakFilmova.json'

  private movies: MovieModel[] = []
  private client: HttpClient
  constructor() {
    this.client = inject(HttpClient)
  }


  public getMovies() {
    return this.client.get<MovieModel[]>(this.url, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }
}
