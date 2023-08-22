import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;
  showErrorMessage = false;
  
  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit(): void{
    this.loginForm = this.createLoginFormGroup();
  }

  createLoginFormGroup(): FormGroup{
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    })
  }

  login(){   
    console.log("LOGIN PRESSED!")
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((msg) => console.log(msg),(error)=> {this.showErrorMessage = true   }
    ) 
  }
  toregister(){
    this.router.navigate(['/signup'])
  }
}
