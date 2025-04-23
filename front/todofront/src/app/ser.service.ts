import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { $locationShim } from '@angular/common/upgrade';
import { LoginInt, TokenInt, TaskInt } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SerService {
  constructor(private http: HttpClient) {
    
  }
  private tasks = new BehaviorSubject<TaskInt[]>([]);

  private taskUrl:string = "http://localhost:8000/api/tasks/";
  getTasks(): Observable<TaskInt[]> {
    return this.http.get<TaskInt[]>(this.taskUrl);
  }
  
  private loginUrl:string = "http://localhost:8000/api/auth/login/";
  login(authModel: LoginInt): Observable<TokenInt>{
    return this.http.post<TokenInt>(this.loginUrl, authModel);
  }
}
