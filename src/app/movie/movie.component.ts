import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [NgIf,
    MatCardModule,
    MatListModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  public movieService: MovieService
  public movie: MovieModel | undefined

  constructor(private route: ActivatedRoute) {
    this.movieService = MovieService.getInstance()
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      let id: number = +params['id']
      this.movieService.getMovieById(id).subscribe((response) => {
        this.movie = response
      })
    });
  }
}
