import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchContainerComponent } from '../search-container/search-container.component';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { DataService } from '../services/data.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchContainerComponent,
    MatTableModule,
    NgIf,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor,
    MatListModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  public movies: MovieModel[] = []
  public movie: MovieModel | undefined = undefined
  // public zanr: string[] = []
  // public cena: number[] = []

  // public nazivFilma: string | null = null
  // public zanrFilma: string | null = null
  // public cenaFilma: number | null = null

  // public sNaziv: string | null = null
  // public sZanr: string | null = null
  // public sCena: number | null = null

  displayedColumns = ['position', 'name', 'genre', 'price', 'info', 'book'];
  public dataSource: MatTableDataSource<MovieModel> | null = null

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: MovieService,
    private dataService: DataService,) { }

  // ngOnInit(): void {
  //   this.activeRoute.queryParams.subscribe(params => {
  //     this.nazivFilma = params['naziv']
  //     this.zanrFilma = params['zanr']
  //     this.cenaFilma = params['cena']
  //   })
  //   this.service.getMovies().subscribe(
  //     (response) => {
  //       this.movies = response
  //     }
  //   )
  //   this.zanr = this.dataService.getZanr()
  //   this.cena = this.dataService.getCena()
  // }

  // public doSearch() {
  //   const criteria = this.dataService.getFromSearch()
  //   const selectedMovieName = criteria.nazivFilma
  //   const selectedGenre = criteria.zanrFilma
  //   const selectedPrice = criteria.cenaFilma

  //   // console.log(selectedGenre)

  //   const filteredMovies = this.movies.filter(movie => {
  //     const matchesName = selectedMovieName ? movie.naziv === selectedMovieName : true;
  //     const matchesGenre = selectedGenre ? movie.zanr === selectedGenre : true;
  //     const matchesPrice = selectedPrice ? movie.projekcije[0].cena === selectedPrice : true;

  //     return matchesName && matchesGenre && matchesPrice;
  //   });
  //   // console.log(filteredMovies)
  //   if (filteredMovies.length>0) {
  //     this.dataSource = new MatTableDataSource<MovieModel>(filteredMovies);
  //   } else {
  //     console.log('Film nije pronađen')
  //   }
  // }

  public doSearch() {
    const criteria = this.dataService.getFromSearch();
    const selectedMovieName = criteria.nazivFilma
    const selectedGenre = criteria.zanrFilma
    const selectedPrice = criteria.cenaFilma

    let movieFound = false

    const filteredMovies = this.movies.filter(movie => {
      const matchesName = selectedMovieName ? movie.naziv === selectedMovieName : false
      const matchesGenre = selectedGenre ? movie.zanr === selectedGenre : false
      const matchesPrice = selectedPrice ? movie.projekcije[0].cena === selectedPrice : false

      if (matchesName) {movieFound = true}
      if (matchesGenre) {movieFound = true}
      if (matchesPrice) {movieFound = true}
      return matchesName || matchesGenre || matchesPrice
    });
   
    if (filteredMovies.length > 0) {
      if (movieFound && selectedMovieName) {
        
        this.service.getMovieByName(selectedMovieName).subscribe((response) => {
          this.movie = response
        })
      }
      if (movieFound && selectedGenre) {
        
        this.service.getMovieByZanr(selectedGenre).subscribe((response) => {
          this.movies = response
        })
      }
      if (movieFound && selectedPrice) {
        
        this.service.getMovieByCena(selectedPrice).subscribe((response) => {
          this.movies = response
        })
      }
      this.dataSource = new MatTableDataSource<MovieModel>(filteredMovies)
    } else {
      alert('Film nije pronađen')
      this.service.getMovies().subscribe(
        (response) => {
          this.movies = response
        }
      )
      this.dataSource = new MatTableDataSource<MovieModel>(this.movies)
    }
  }
}