import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonComponent,
    FormFieldComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {
    const newUser = new User();
    newUser.name = this.name;
    newUser.email = this.email;
    newUser.username = this.username;
    newUser.password = this.password;
    newUser.type = 'user';

    this.userService.createUser(newUser).subscribe((user: User) => {
      console.log(user);
      this.authService.login(user.email, this.password).subscribe({
        next: (_) => {
          localStorage.setItem('authToken', btoa(`${ user.email }:${ this.password }`));
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized: Incorrect username or password.';
          } else {
            this.errorMessage = 'Login failed. Please try again later.';
          }
        }
      });
    });
  }
}
