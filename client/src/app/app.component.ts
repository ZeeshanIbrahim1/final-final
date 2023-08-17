import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private router:Router){}
  shouldShowNavigation(): boolean {
    const currentRoute = this.router.routerState.snapshot.url;
    const noNavigation = ['/login','/signup'];
    return !noNavigation.includes(currentRoute);
  }
}
