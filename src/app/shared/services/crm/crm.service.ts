import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../utils/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  private path = `${environment.baseUrl}`;
  //private token = `${environment.token}`;

  headerParams = {
    'Authorization': this.authService.token
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerParams)
  }

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  /*************** AGENT RELATED ACTIONS ***************/

  //Create a new agent
  public createAgent(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addEmployee`, info, this.requestOptions);
  }

  //Get the list of all Agents
  public getAgents(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchAgents`, this.requestOptions);
  }

  /*************** LEAD RELATED ACTIONS ***************/

  //Create a new lead
  public createLead(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/createLead`, info, this.requestOptions);
  }

  //Get the list of all Leads
  public getLeads(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchLeads`, this.requestOptions);
  }

  /*************** CONTACT RELATED ACTIONS ***************/

  //Create a new contact
  public createContact(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/createContact`, info, this.requestOptions);
  }

  //Get the list of all Contacts
  public getContacts(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchContacts`, this.requestOptions);
  }

  /*************** TICKET RELATED ACTIONS ***************/

  //Create a new contact
  public createTicket(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/createTicket`, info, this.requestOptions);
  }

  //Get the list of all Contacts
  public getTickets(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchTickets`, this.requestOptions);
  }

  /*************** SOCIAL MEDIA RELATED ACTIONS ***************/

  //Create a new media post
  public createMediaPost(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/socialMedia/post`, info, this.requestOptions);
  }

  //Get the list of all Media Posts
  public getMediaPosts(): Observable<any> {
    return this.http.get<any>(`${this.path}/socialMedia`, this.requestOptions);
  }

  //Delete media post
  public deleteMediapost(postId: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/socialMedia/${postId}`, this.requestOptions);
  }

}
