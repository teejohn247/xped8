import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private path = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  public signup(signupDetails: any): Observable<any> {
    return this.http.post<any>(`${this.path}/signup`, signupDetails);
  }

  public login(loginDetails: any): Observable<any> {
    //console.log(loginDetails);
    return this.http.post<any>(`${this.path}/signin`, loginDetails);
  }
}
