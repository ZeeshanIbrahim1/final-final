import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
  }
  signOut(): void {
    this.authService.signOut();
  }
  goHome(){
    this.router.navigate(['/home'])
  }
  addPatient(){
    this.router.navigate(['/patient']);
  }
  viewAllPatient(){
    this.router.navigate(['/allPatient'])
  }
  viewAllCases(){
    this.router.navigate(['/allCases'])
  }
  viewAllAppointments(){
    this.router.navigate(['/allAppointments'])
  }
  viewChartjs(){
    this.router.navigate(['/charts'])
  }
  viewNjxChart(){
    this.router.navigate(['/njxChart'])

  }
}
