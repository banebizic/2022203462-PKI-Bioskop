import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MovieModel } from '../models/movie.model';

@Component({
  selector: 'app-search-container',
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
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent {

  @Input() movies: MovieModel[] | undefined
  @Input() zanr: string[] | undefined
  @Input() cena: number[] | undefined
}
