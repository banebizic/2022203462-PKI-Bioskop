import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MovieModel } from '../models/movie.model';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor,
    RouterLink,
    MatListModule,
    MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public movies: MovieModel[] = [];
  public zanr: string[] = ["War", "Drama", "Action"]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    const url = 'assets/data/spisakFilmova.json';
    this.httpClient.get<MovieModel[]>(url, {
      headers: {
        'Accept': 'application/json'
      }
    }).subscribe(
      (response) => {
        this.movies = response;
      }
    );
  }
}
