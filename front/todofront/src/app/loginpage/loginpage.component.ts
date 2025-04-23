import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginInt } from '../interfaces';
import { FormsModule } from "@angular/forms";
import { SerService } from '../ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, FormsModule],
  template:`
    <fieldset>
      <label>Username</label>
      <input type="text" [(ngModel)] = "authModel.username">
    </fieldset>
    <fieldset>
      <label>Password</label>
      <input type="password" [(ngModel)] = "authModel.password">
    </fieldset>

    <button (click)="login()">Login</button>
    `
  ,
})
export class LoginpageComponent {
  title = 'hh-front';
  authModel: LoginInt;

  //private ser: SerService
  constructor(private ser: SerService, private router: Router){
    this.authModel = {} as LoginInt
    console.log(this.authModel)
  }

  login(){
    console.log("Login button!")
    this.ser.login(this.authModel).subscribe((token) =>
      {
        localStorage.setItem('access', token.access);
        localStorage.setItem('refresh', token.refresh);
        this.router.navigate(['/tasks']);
      }
    );
  }

  ngOnInit(){
  }
}