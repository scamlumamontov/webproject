import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { access } from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`
    <h1>To-do list!</h1>
    <button (click)="logout()">Logout</button>
    <button (click)="login()">Login</button>
    <button (click)="create()">Create task!</button>
    <button (click)="tasks()">See tasks!</button>
    <button (click)="byid()">Search by id!</button>
    <div></div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todofront';

  constructor(private router: Router){
    
  }

  byid(){
    this.router.navigate(['/taskbyid']);
  }
  tasks(){
    this.router.navigate(['/tasks']);
  }
  login():void{
    this.router.navigate(['/login']);
  }

  logout():void{
    localStorage.setItem('access', "");
    localStorage.setItem('refresh', "");
    this.router.navigate(['/login']);
  }

  create():void{
    this.router.navigate(['/createtask']);
  }
}
