import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../utils/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HumanResourcesService {

  private path = `${environment.baseUrl}`;
  //private token = `${environment.token}`;

  headerParams = {
    'Authorization': this.authService.token
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerParams)
  }

  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  /*************** DEPARTMENT RELATED ACTIONS ***************/

  //Create a new department
  public createDepartment(departmentName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addDepartment`, departmentName, this.requestOptions);
  }

  //Get the list of all Departments
  public getDepartments(): Observable<any> {
    console.log(this.authService.token)
    console.log(this.requestOptions);
    return this.http.get<any>(`${this.path}/fetchDepartments`, this.requestOptions);
  }


  /*************** COMPANY ROLES RELATED ACTIONS ***************/

  //Create a new company role
  public createCompanyRole(roleName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addRole`, roleName, this.requestOptions);
  }

  //Get the list of all Company Roles
  public getCompanyRoles(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchCompanyRoles`, this.requestOptions);
  }


  /*************** DESIGNATIONS RELATED ACTIONS ***************/

  //Create a new designation
  public createDesignation(designationName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/createDesignation`, designationName, this.requestOptions);
  }

  //Get the list of all Designations
  public getDesignations(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchDesignations`, this.requestOptions);
  }
}
