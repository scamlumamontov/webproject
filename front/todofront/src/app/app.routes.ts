import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    {path:"login", component:LoginpageComponent},
    {path:"tasks", component:TasksComponent},
    {path:"tasks/:id", component:TasksComponent},
];
