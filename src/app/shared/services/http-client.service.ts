import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  
  constructor(private http: HttpClient) {}

  get<T>(url: string, headers?: HttpHeaders, params?: HttpParams, responseType?: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(url, {
      headers,
      observe: 'response',
      responseType: responseType as 'json',
      params
    }).pipe(catchError(error => this.returnError(error)));
  }

  post<T>(url: string, body?: any, headers?: HttpHeaders, params?: HttpParams, responseType?: string): Observable<HttpResponse<T>> {
    return this.http.post<T>(url, body, {
      headers,
      observe: 'response',
      responseType: responseType as 'json',
      params
    }).pipe(catchError(error => this.returnError(error)));
  }

  private returnError(error: HttpErrorResponse): Observable<any> {
    const err = { status: error.status, code: '500', message: ''};

    const errorRes = error.error;
    if (errorRes) {
      err.code = errorRes.code;
      err.message = errorRes.message;

      return throwError(err);
    }

    return throwError(err);
  }
}