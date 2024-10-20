import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { BookingService } from '../services/booking.service';
import { MovieStatus } from '../models/movieStatus.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchContainerComponent,
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

  private service: MovieService
  private dataService: DataService
  private bookingService: BookingService

  public movies: MovieModel[] = []
  public movie: MovieModel | undefined = undefined


  displayedColumns = ['position', 'name', 'genre', 'price', 'info', 'book']
  public dataSource: MatTableDataSource<MovieModel> | null = null

  constructor(private router: Router) {
    this.service = MovieService.getInstance()
    this.dataService = DataService.getInstance()
    this.bookingService = BookingService.getInstance()
  }


  public doSearch() {
    const criteria = this.dataService.getFromSearch()
    const selectedMovieName = criteria.nazivFilma
    const selectedGenre = criteria.zanrFilma
    const selectedPrice = criteria.cenaFilma

    let movieFound = false

    const filteredMovies = this.movies.filter(movie => {
      const matchesName = selectedMovieName ? movie.naziv === selectedMovieName : false
      const matchesGenre = selectedGenre ? movie.zanr === selectedGenre : false
      const matchesPrice = selectedPrice ? movie.projekcije[0].cena === selectedPrice : false

      if (matchesName) { movieFound = true }
      if (matchesGenre) { movieFound = true }
      if (matchesPrice) { movieFound = true }
      return matchesName || matchesGenre || matchesPrice
    })

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

  reserveTicket(movie: MovieModel, selectedProjection: MovieStatus) {
    this.bookingService.reserveTicket(movie, selectedProjection)
    this.router.navigate(['/cart'])
  }
}