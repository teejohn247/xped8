import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HumanResourcesService {

  private path = `${environment.baseUrl}`;
  private token = `${environment.token}`;

  headerParams = {
    'Authorization': this.token
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerParams)
  }

  constructor(private http: HttpClient) { }

  //Get the list of all Departments
  public getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchDepartments`, this.requestOptions);
  }

  //Get the list of all Company Roles
  public getCompanyRoles(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchCompanyRoles`, this.requestOptions);
  }
}
