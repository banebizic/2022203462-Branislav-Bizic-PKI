import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BookingService } from '../services/booking.service';
import { MovieStatus } from '../models/movieStatus.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
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
  private bookingService: BookingService

  constructor(private route: ActivatedRoute, private router: Router) {
    this.movieService = MovieService.getInstance()
    this.bookingService = BookingService.getInstance()
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      let id: number = +params['id']
      this.movieService.getMovieById(id).subscribe((response) => {
        this.movie = response
      })
    })
  }

  reserveTicket(movie: MovieModel, selectedProjection: MovieStatus) {
    this.bookingService.reserveTicket(movie, selectedProjection)
    this.router.navigate(['/cart'])
  }
}
