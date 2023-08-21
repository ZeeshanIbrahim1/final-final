// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate () {
    if (this.authService.getToken()) {
      return true; // User is authenticated
    } else {
      this.router.navigate(['/login']); // Redirect to home page

      return false;
    }
  }
}
