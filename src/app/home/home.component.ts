import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MovieModel } from '../models/movie.model';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../services/movie.service';

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

  private service: MovieService
  public movies: MovieModel[] = []
  public zanr: string[] = ["War", "Drama", "Action"]

  constructor() {
    this.service = new MovieService
  }

  ngOnInit(): void {
    this.service.getMovies().subscribe(
      (response) => {
        this.movies = response
      }
    );
  }
}
