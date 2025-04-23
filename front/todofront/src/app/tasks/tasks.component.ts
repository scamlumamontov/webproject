import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NgFor, NgIf } from '@angular/common';
import { SerService } from '../ser.service';
import { TaskInt } from '../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [NgFor, NgIf, TaskComponent],
  template:`
    <h2 *ngIf="checklocal()">You need to log in first!</h2>
    <div class="tasks">
      <app-task *ngFor="let k of tasklist; index as id" [task]="k" [id]="id"></app-task>
    </div>
  `,
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasklist:TaskInt[] = [];
  cur!: Observable<TaskInt[]>;

  constructor(private ser: SerService){
    
  }

  checklocal():boolean{
    let buf = localStorage.getItem('refresh')
    if(!buf) buf = "";
    if(buf == "") return true;
    return false;
  }

  ngOnInit(){
    this.cur = this.ser.getTasks();
    this.cur.subscribe(companies => {
      this.tasklist = [];
      for(let k of companies){ this.tasklist.push(k); }
    });
  }
}
