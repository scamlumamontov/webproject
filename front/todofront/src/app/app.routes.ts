import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { TaskbyidComponent } from './taskbyid/taskbyid.component';

export const routes: Routes = [
    {path:"login", component:LoginpageComponent},
    {path:"tasks", component:TasksComponent},
    {path:"createtask", component:CreatetaskComponent},
    {path:"taskbyid", component:TaskbyidComponent},
];
