import { Component } from '@angular/core';
import { TaskInt } from '../interfaces';
import { Input } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  template:`
    <div class="box">
      <p class="text">user: {{task.user}}</p>
      <p class="text">id: {{task.id}}, priority: {{task.priority}}, category: {{task.category}}, completed: {{task.completed}}</p>
      <p class="text">title: {{task.title}}</p>
      <p class="text">description: {{task.description}}</p>
      <p class="text">created_at: {{task.created_at}}</p>
    </div>
  `,
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!:TaskInt;

}
