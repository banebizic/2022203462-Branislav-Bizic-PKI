import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { MovieModel } from '../models/movie.model';
import { MovieStatus } from '../models/movieStatus.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private static instance: BookingService
  private userService: UserService

  public static getInstance(): BookingService {
    if (BookingService.instance == null)
      BookingService.instance = new BookingService
    return BookingService.instance
  }

  private cart: Booking[] = []

  constructor() {
    this.userService = UserService.getInstance()
  }

  addToCart(booking: Booking) {
    this.cart.push(booking)
  }

  getCart(): Booking[] {
    return this.cart
  }

  reserveTicket(movie: MovieModel, selectedProjection: MovieStatus) {
    selectedProjection.status = 'rezervisano'
    const booking: Booking = {
      movie: movie,
    }
    this.addToCart(booking)
    alert(`${movie.naziv} je dodat u korpu!`)

    const currentUser = this.userService.getCurrentUser()

    if (!currentUser.rezervisaniFilmovi.includes(movie.naziv)) {
      currentUser.rezervisaniFilmovi.push(movie.naziv)
      this.userService.updateUser(currentUser)
    }
  }

  removeFromCart(booking: Booking) {
    this.cart = this.cart.filter(b => b !== booking)
  }

  calculateTotalPrice(): number {
    return this.cart.reduce((total, booking) => {
      const reservedShowtime = booking.movie.projekcije.find(projection =>
        projection.status === 'rezervisano'
      )
      return total + (reservedShowtime ? reservedShowtime.cena : 0)
    }, 0)
  }

  clearCart(): void {
    this.cart = []
  }
}
