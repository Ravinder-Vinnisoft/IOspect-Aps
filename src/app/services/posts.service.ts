import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl = `${environment.BASE_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`)
      .pipe(catchError(this.handleError));
  }

  createPost(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, payload)
      .pipe(catchError(this.handleError));
  }

  deletePostComment(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${id}`, id)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error || "Server Error");
  };
}
