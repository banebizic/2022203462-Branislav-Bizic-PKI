import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  public email: string = ''
  public name: string = ''
  public password: string = ''
  public confirmPassword: string = ''
  public phone: string = ''
  public adress: string = ''
  private userService: UserService

  public constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance()
  }

  public updateEmail(e: any) {
    this.email = e.target.value
  }

  public updateName(e: any) {
    this.name = e.target.value
  }

  public updatePhone(e: any) {
    this.phone = e.target.value

  } public updateAdress(e: any) {
    this.adress = e.target.value
  }

  public updatePassword(e: any) {
    this.password = e.target.value
  }

  public updateConfirmPassword(e: any) {
    this.confirmPassword = e.target.value
  }


  public doSignup() {
    if (this.email == '') return
    if (this.name == '') return
    if (this.phone == '') return
    if (this.adress == '') return
    if (this.password == '') return
    if (this.confirmPassword == '') return
    if (this.password != this.confirmPassword) {
      alert('Sifre se ne poklapaju')
      return
    }

    try {
      this.userService.createUser({
        email: this.email,
        name: this.name,
        phone: this.phone,
        adress: this.adress,
        password: this.password,
        omiljeniFilmovi: [],
        rezervisaniFilmovi: []
      })
    } catch (e) {
      alert(e)
      return
    }

    this.router.navigate(['/login'], {
      relativeTo: this.route
    })
  }
}
