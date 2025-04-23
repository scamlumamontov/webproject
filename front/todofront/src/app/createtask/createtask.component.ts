import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginInt } from '../interfaces';
import { FormsModule } from "@angular/forms";
import { SerService } from '../ser.service';
import { Router } from '@angular/router';
import { TaskInt } from '../interfaces';

@Component({
  selector: 'app-createtask',
  imports: [FormsModule],
  template:`
    <fieldset>
        <label>Title</label>
        <input type="text" [(ngModel)] = "cur.title">
    </fieldset>
    <fieldset>
      <label>Description</label>
      <input type="text" [(ngModel)] = "cur.description">
    </fieldset>
    <fieldset>
      <label>Category</label>
      <input type="text" [(ngModel)] = "cur.category">
    </fieldset>
    <fieldset>
      <label>Priority</label>
      <input type="text" [(ngModel)] = "cur.priority">
    </fieldset>
    <fieldset>
      <label>Completed (true/false)</label>
      <input type="text" [(ngModel)] = "cur.completed">
    </fieldset>
    <button (click)="post()">Post</button>
  `,
  styleUrl: './createtask.component.css'
})
export class CreatetaskComponent {
  cur: TaskInt = {} as TaskInt;

  constructor(private ser: SerService){

  }

  post(): void {
    this.cur.created_at = new Date();
    this.cur.user = this.ser.getUserId();
  
    this.ser.createtask(this.cur).subscribe({
      next: (res) => {
        console.log('Успешно отправлено:', res);
      },
      error: (err) => {
        console.error('Ошибка при отправке:', err);
      }
    });
  }


}
