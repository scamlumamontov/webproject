import { Component } from '@angular/core';
import { TaskInt } from '../interfaces';
import { Input, Output } from '@angular/core';
import { SerService } from '../ser.service';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [],
  template:`
    <div class="box">
      <p class="text">user: {{task.user}}</p>
      <p class="text">id: {{task.id}}, priority: {{task.priority}}, category: {{task.category}}, completed: {{task.completed}}</p>
      <p class="text">title: {{task.title}}</p>
      <p class="text">description: {{task.description}}</p>
      <p class="text">created_at: {{task.created_at}}</p>
      <button (click)="delete(task.id)">Delete!</button>
      <button (click)="update(task.id)">Update!</button>
    </div>
  `,
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() task!:TaskInt;
  @Output() DeletePress = new EventEmitter<number>();

  constructor(private ser:SerService, private router: Router){

  }

  update(id:number): void{
    console.log("Update clicked!");
    console.log(`myposts/${id}`);
    this.router.navigate([`myposts/${id}`]);
  }

  delete(id: number): void {
    this.ser.deleteTask(id)
      .subscribe({
        next: () => {
          this.DeletePress.emit(this.task.id);
          console.log(`Task ${id} deleted`);
        },
        error: err => {
          console.error('Delete failed', err);
        }
      });
  }
}
