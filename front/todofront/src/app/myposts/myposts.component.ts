import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NgFor, NgIf } from '@angular/common';
import { SerService } from '../ser.service';
import { TaskInt } from '../interfaces';
import { Observable } from 'rxjs';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-myposts',
  imports: [NgFor, NgIf, PostComponent],
  template:`
    <h2 *ngIf="checklocal()">You need to log in first!</h2>
    <div class="tasks">
      <app-post *ngFor="let k of tasklist; index as id" [task]="k" [id]="id" (DeletePress)="DeletePress($event)"></app-post>
    </div>
  `,
  styleUrl: './myposts.component.css'
})
export class MypostsComponent {
  tasklist:TaskInt[] = [];
  cur!: Observable<TaskInt[]>;

  constructor(private ser: SerService){
    
  }

  DeletePress(index: number):void{
    console.log(index + " deleted");
    this.tasklist = this.tasklist.filter((a) => (a.id == index ? false : true));
  }

  checklocal():boolean{
    let buf = localStorage.getItem('refresh')
    if(!buf) buf = "";
    if(buf == "") return true;
    return false;
  }

  ngOnInit(){
    this.cur = this.ser.getmyTasks();
    this.cur.subscribe(companies => {
      this.tasklist = [];
      for(let k of companies){ this.tasklist.push(k); }
    });
  }
}
