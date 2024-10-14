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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchContainerComponent,
    MatTableModule,
    MatCardModule,
    NgIf,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor,
    MatListModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  public movies: MovieModel[] = []
  public zanr: string[] = []
  public cena: number[] = []

  public nazivFilma: string | null = null
  public zanrFilma: string | null = null
  public cenaFilma: number | null = null

  public sNaziv: string | null = null
  public sZanr: string | null = null
  public sCena: number | null = null

  displayedColumns = ['position', 'name', 'genre', 'price'];
  public dataSource: MatTableDataSource<MovieModel> | null = null

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: MovieService,
    private dataService: DataService,) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.nazivFilma = params['naziv']
      this.zanrFilma = params['zanr']
      this.cenaFilma = params['cena']
    })
    this.service.getMovies().subscribe(
      (response) => {
        this.movies = response
      }
    )
    this.zanr = this.dataService.getZanr()
    this.cena = this.dataService.getCena()
    // this.service.getMovieByName('Platoon').subscribe(response => {
    //   if (response) {
    //     this.dataSource = new MatTableDataSource<MovieModel>([response])
    //   } else {
    //     console.log('Film nije pronađen')
    //   }
    // })
    this.service.getMovieByCena(1500).subscribe(response => {
      if (response && response.length > 0) {
        this.dataSource = new MatTableDataSource<MovieModel>(response)
      } else {
        console.log('Nema filmova za odabrani žanr')
        this.dataSource = new MatTableDataSource<MovieModel>([])
      }
    })
  }
  public doSearch() {
    const selectedMovieName = this.sNaziv;
    const selectedGenre = this.sZanr;
    const selectedPrice = this.sCena;

    // Prvo filtriramo filmove po ID-ju
    const filteredMovies = this.movies.filter(movie => {
      const matchesId = selectedMovieName ? movie.naziv === selectedMovieName : true;
      const matchesGenre = selectedGenre ? movie.zanr === selectedGenre : true;
      const matchesPrice = selectedPrice ? movie.projekcije[0].cena === selectedPrice : true;

      return matchesId && matchesGenre && matchesPrice;
    });

    // Postavi dataSource sa filtriranim filmovima
    this.dataSource = new MatTableDataSource<MovieModel>(filteredMovies);
    // }
    //   public doSearch() {
    //     if (this.router.url != "/search") {
    //       this.router.navigate(['/search'], { relativeTo: this.activeRoute })
    //     }

    //     console.log(this.sNaziv, this.sZanr, this.sCena)
    //   }

  }
}