import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchContainerComponent } from '../search-container/search-container.component';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchContainerComponent],
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

  constructor(
    private route: ActivatedRoute,
    private service: MovieService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
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
  }

}
