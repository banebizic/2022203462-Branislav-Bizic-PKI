import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MovieModel } from '../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';

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
export class SearchContainerComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter()
  public movieService: MovieService
  public dataService: DataService
  public movies: MovieModel[] = []

  public sNaziv: string | null
  public sZanr: string | null
  public sCena: number | null

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.movieService = MovieService.getInstance()
    this.dataService = DataService.getInstance()
    const criteria = this.dataService.getFromSearch()
    this.sNaziv = criteria.nazivFilma
    this.sCena = criteria.cenaFilma
    this.sZanr = criteria.zanrFilma
  }
  ngOnInit(): void {
    this.movieService.getMovies().subscribe((response) => { this.movies = response })
  }

  public doSearch() {
    this.dataService.saveSearchCriteria({
      nazivFilma: this.sNaziv,
      zanrFilma: this.sZanr,
      cenaFilma: this.sCena
    })

    if (this.router.url != "/search") {
      this.router.navigate(['/search'], { relativeTo: this.activeRoute })
      return
    }
    this.onSearch.emit()
  }
  public resetPolja() {
    this.sNaziv = null
    this.sZanr = null
    this.sCena = null
  }
}
