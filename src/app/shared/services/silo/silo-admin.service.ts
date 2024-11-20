import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../utils/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class SiloAdminService {

  headerParams = {
    'Authorization': this.authService.token
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerParams)
  }

  private path = `${environment.siloBaseUrl}`;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  //Get the list of all companies
  public getAllCompanies(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchAllCompanies`, this.requestOptions);
  }
}
