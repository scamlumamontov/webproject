import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { TaskbyidComponent } from './taskbyid/taskbyid.component';
import { MypostsComponent } from './myposts/myposts.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';

export const routes: Routes = [
    {path:"login", component:LoginpageComponent},
    {path:"tasks", component:TasksComponent},
    {path:"createtask", component:CreatetaskComponent},
    {path:"taskbyid", component:TaskbyidComponent},
    {path:"myposts", component:MypostsComponent},
    {path:"myposts/:id", component:UpdatepostComponent},
];
