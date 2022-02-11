import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl = `${environment.BASE_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  getCommentsByPostId(postId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments?${postId}`, postId)
      .pipe(catchError(this.handleError));
  }

  createComment(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, payload)
      .pipe(catchError(this.handleError));
  }

  updateComment(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/comments/${payload.id}`, payload)
      .pipe(catchError(this.handleError));
  }

  getAllcomments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error || "Server Error");
  };
}
