import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { $locationShim } from '@angular/common/upgrade';
import { LoginInt, TokenInt, TaskInt } from './interfaces';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SerService {
  constructor(private http: HttpClient) {
    
  }
  private tasks = new BehaviorSubject<TaskInt[]>([]);

  getUserId():number{
    let cur = localStorage.getItem('refresh');
    if(!cur){
      window.location.href = '/login';
      return 0;
    }

    const decoded = jwtDecode<JwtPayload>(cur) as JwtPayload;
    return decoded.user_id;
  }

  private taskUrl:string = "http://localhost:8000/api/tasks/";
  getTasks(): Observable<TaskInt[]> {
    //console.log(localStorage.getItem('access'));
    //console.log(localStorage.getItem('refresh'));

    return this.http.get<TaskInt[]>(this.taskUrl);
  }

  getmyTasks(): Observable<TaskInt[]> {
    let cur = localStorage.getItem('refresh');
    if(!cur) return new Observable<TaskInt[]>;
    let myurl = this.taskUrl + this.getUserId() + "/user/";
    return this.http.get<TaskInt[]>(myurl);
  }

  getTask(id: number): Observable<TaskInt> {
    console.log(this.taskUrl + id + "/");
    return this.http.get<TaskInt>(this.taskUrl + id + "/");
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.taskUrl}${id}/`);
  }

  updateTask(task: TaskInt): Observable<TaskInt> {
    return this.http.put<TaskInt>(`${this.taskUrl}${task.id}/`, task);
  }
  
  private loginUrl:string = "http://localhost:8000/api/auth/login/";
  login(authModel: LoginInt): Observable<TokenInt>{
    return this.http.post<TokenInt>(this.loginUrl, authModel);
  }

  private postUrl:string = "http://localhost:8000/api/tasks/create/";
  createtask(cur: TaskInt) {
    return this.http.post<TaskInt>(this.postUrl, cur);
  }
}
