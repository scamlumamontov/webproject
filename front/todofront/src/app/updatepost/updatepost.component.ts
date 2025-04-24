import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TaskInt } from '../interfaces';
import { ActivatedRoute, Route } from '@angular/router';
import { inject } from '@angular/core';
import { SerService } from '../ser.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepost',
  imports: [FormsModule],
  template:`
  <h1>Type something creative~</h1>
  <fieldset>
        <label>Title</label>
        <input type="text" [(ngModel)] = "task.title">
    </fieldset>
    <fieldset>
      <label>Description</label>
      <input type="text" [(ngModel)] = "task.description">
    </fieldset>
    <fieldset>
      <label>Category</label>
      <input type="text" [(ngModel)] = "task.category">
    </fieldset>
    <fieldset>
      <label>Priority</label>
      <input type="text" [(ngModel)] = "task.priority">
    </fieldset>
    <fieldset>
      <label>Completed (true/false)</label>
      <input type="text" [(ngModel)] = "task.completed">
    </fieldset>
    <button (click)="post()">Post</button>
  `,
  styleUrl: './updatepost.component.css'
})
export class UpdatepostComponent {
  @Input() task!:TaskInt;
  id!:number;
  cur!: Observable<TaskInt>;
  status:boolean = true;

  constructor(private ser:SerService, private router: Router){

  }

  private route = inject(ActivatedRoute);
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.cur = this.ser.getTask(this.id);
      this.cur.subscribe({
        next: task => {
          this.task = task;
        },
        error: err => {
          this.status = false;
        }
    });
    });
  }

  post():void{
    this.ser.updateTask(this.task).subscribe({
      next: updatedTask => {
        console.log('ok', updatedTask);
        this.router.navigate(['/myposts']);
      },
      error: err => {
        console.error('error', err);
      }
    });
    this.router.navigate(['/myposts']);
  }

}
