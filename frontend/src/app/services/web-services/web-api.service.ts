import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class WebApiService {
  options: HttpParams;

  baseUrl = environment.baseURL;
  constructor(
    private httpClient: HttpClient,
  ) { }

  // intecepting every req with user access token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        access_token: localStorage.getItem('access_token')
      }
    });

    return next.handle(req);
  }

  createTaskService(param: any): Observable<boolean> {
    return this.httpClient.post(this.baseUrl + '/api/task', param)
      .pipe(
        map((result: any) => {
          return true;
        })
      );
  }

  fetchTaskService(params: any): Observable<boolean> {
    return this.httpClient.get(this.baseUrl + '/api/task', { params })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  updateTaskService(params: any): Observable<boolean> {
    return this.httpClient.put(this.baseUrl + '/api/task', params)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  deleteTaskService(params: any): Observable<boolean> {
    return this.httpClient.delete(this.baseUrl + '/api/task', { params })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

}
