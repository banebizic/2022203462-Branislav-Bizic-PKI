import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { NgFor, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatTableModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private bookingService: BookingService

  displayedColumns: string[] = ['naziv', 'cena', 'actions']
  dataSource: MatTableDataSource<Booking>

  constructor() {
    this.bookingService = BookingService.getInstance()
    this.dataSource = new MatTableDataSource(this.getCart())
  }

  getCart(): Booking[] {
    return this.bookingService.getCart()
  }

  getTicketPrice(booking: Booking): number {
    const reservedProjections = booking.movie.projekcije.filter(projection =>
      projection.status === 'rezervisano'
    )

    // console.log(reservedProjections)
    return reservedProjections.length > 0 ? reservedProjections[0].cena : 0
  }

  getTotalPrice(): number {
    return this.bookingService.calculateTotalPrice()
  }

  remove(booking: Booking): void {
    this.bookingService.removeFromCart(booking)
    this.dataSource.data = this.getCart()
  }

  buy() {
    const bookings = this.getCart()

    let odgledaniFilmovi = JSON.parse(localStorage.getItem('odgledani')! || '[]')

    bookings.forEach(booking => {
      booking.movie.projekcije.forEach(projection => {

        if (projection.status === 'rezervisano') {
          projection.status = 'gledano'
          odgledaniFilmovi.push(booking)
        }
      })
    })
    localStorage.setItem('odgledani', JSON.stringify(odgledaniFilmovi))

    this.bookingService.clearCart()
    this.dataSource.data = this.getCart()
  }
}
