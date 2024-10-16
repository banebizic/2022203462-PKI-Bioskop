import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MovieService } from '../services/movie.service';
import { UserModel } from '../models/user.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatListModule, NgIf, NgFor, RouterLink, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  private userService: UserService
  public movieService: MovieService
  public active: UserModel | null = null

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance()
    this.movieService = MovieService.getInstance()
  }
  ngOnInit(): void {
    try {
      this.active = this.userService.getCurrentUser()
    } catch (e) {
      this.router.navigate(['/login'], {relativeTo: this.route})
    }
  }

  public getAvatarUrl() {
    return 'https://ui-avatars.com/api/?name=' + this.active?.name
  }
  public doLogout() {
    this.userService.logout()
    this.router.navigate(['/'], {
      relativeTo: this.route
    })
  }
  public doPasswordChange(){

  }
}
