import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, HttpClientModule, NgIf, NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// export class HomeComponent implements OnInit {

//   private client: HttpClient
//   public recomended: any[] = []

//   constructor(private httpClient: HttpClient){
//     this.client = httpClient
//   }
//   ngOnInit(): void {
//     const url ='assets/data/spisakFilmova.json'
//     this.client.get<any>(url, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     }).subscribe(rsp => this.recomended = rsp.content)
//   }

// }
export class HomeComponent implements OnInit {

  public recomended: any[] = []; // Niz koji će sadržati učitane filmove

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const url = 'assets/data/spisakFilmova.json'; // Putanja do JSON fajla
    this.httpClient.get<any[]>(url, {
      headers: {
        'Accept': 'application/json'
      }
    }).subscribe(
      (response) => {
        this.recomended = response; // Učitani filmovi
      },
      (error) => {
        console.error('Greška prilikom učitavanja filmova', error);
      }
    );
  }
}
