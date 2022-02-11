import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = `${environment.BASE_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  get isUserLoggedIn(): boolean {
    let user = localStorage.getItem('IospectUser');
    return (user) ? true : false;
  };

  login(email: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?${email}`, email)
      .pipe(catchError(this.handleError));
  };

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error || "Server Error");
  };

  logout() {
    return new Promise((resolve, reject) => {
      resolve(localStorage.removeItem('IospectUser'));
    })
  };

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('IospectUser') as string);
  }
}
