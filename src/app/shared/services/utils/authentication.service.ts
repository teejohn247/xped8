import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private path = `${environment.baseUrl}`;
  private _isLoggedin$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'user_auth';
  public isLoggedIn = this._isLoggedin$.asObservable();
  user: any;

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) {
    //Checking for login status in local storage
    //const token = localStorage.getItem('user_auth');
    this._isLoggedin$.next(!!this.token);
  }

  public signup(signupDetails: any): Observable<any> {
    return this.http.post<any>(`${this.path}/signup`, signupDetails);
  }

  public login(loginDetails: any): Observable<any> {
    //console.log(loginDetails);
    return this.http.post<any>(`${this.path}/signin`, loginDetails).pipe(
      tap((res: any) => {
        this._isLoggedin$.next(true);
        localStorage.setItem(this.TOKEN_NAME, res.token);
        console.log(res.token);
        this.user = this.getUser(res.token);
        console.log(this.user);
      })
    );
  }

  private getUser(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }

}
