import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../button/button.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentUser: User|undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.currentUser?.type === 'admin';
  }

  ngOnInit() {
    this.authService.getCurrentUserInformation().subscribe({
      next: (user: any) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
      }
    });
    // if (!this.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    // }
  }
}
