import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MovieModel } from '../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor,
    MatListModule,
    MatSelectModule],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent {

  @Input() movies: MovieModel[] | undefined
  @Input() zanr: string[] | undefined
  @Input() cena: number[] | undefined

  public sNaziv: string | null = null
  public sZanr: string | null = null
  public sCena: number | null = null

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  public doSearch() {
    if (this.router.url != "/search") {
      this.router.navigate(['/search'], { relativeTo: this.activeRoute })
    }

    console.log(this.sNaziv, this.sZanr, this.sCena)
  }
}
