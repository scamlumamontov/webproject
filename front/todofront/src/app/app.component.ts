import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { access } from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`
    <h1>Good old works!</h1>
    <button (click)="logout()">Logout</button>
    <button (click)="login()">Login</button>
    <div></div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todofront';

  constructor(private router: Router){
    
  }

  login():void{
    window.location.href = '/login';
  }

  logout():void{
    localStorage.setItem('access', "");
    localStorage.setItem('refresh', "");
    this.router.navigate(['/login']);
  }
}
