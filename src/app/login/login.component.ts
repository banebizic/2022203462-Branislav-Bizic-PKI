import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public email: string = ''
  public password: string = ''
  public userService: UserService

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance()
  }

  public updateEmail(e: any) {
    this.email = e.target.value
  }

  public updatePassword(e: any) {
    this.password = e.target.value
  }

  public doLogin() {
    if (this.email == '' || this.password == '') {
      alert('Username or password is empty')
      return
    }

    try {
      this.userService.login(this.email, this.password)
      this.router.navigate(['/profile'], { relativeTo: this.route })
    } catch (e) {
      alert(e)
    }
  }

}
