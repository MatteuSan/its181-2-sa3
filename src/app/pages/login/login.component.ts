import { Component } from '@angular/core';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormFieldComponent,
    ButtonComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (_) => {
        localStorage.setItem('authToken', btoa(`${ this.username }:${ this.password }`));
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
  }
}
