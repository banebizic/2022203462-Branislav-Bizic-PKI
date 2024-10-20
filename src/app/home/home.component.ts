import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MovieModel } from '../models/movie.model';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';
import { SearchContainerComponent } from '../search-container/search-container.component';
import { BookingService } from '../services/booking.service';
import { MovieStatus } from '../models/movieStatus.model';

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
    MatSelectModule,
    SearchContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private service: MovieService
  private dataService: DataService
  private bookingService: BookingService

  public movies: MovieModel[] = []
  public zanr: string[] = []
  public cena: number[] = []

  constructor(private router: Router) {
    this.service = MovieService.getInstance()
    this.dataService = DataService.getInstance()
    this.bookingService = BookingService.getInstance()
    this.zanr = this.dataService.getZanr()
    this.cena = this.dataService.getCena()
  }

  ngOnInit(): void {
    this.service.getMovies().subscribe(
      (response) => {
        this.movies = response
      }
    )
  }

  reserveTicket(movie: MovieModel, selectedProjection: MovieStatus) {
    this.bookingService.reserveTicket(movie, selectedProjection)
    this.router.navigate(['/cart'])
  }
}
