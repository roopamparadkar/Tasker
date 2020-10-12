import { Injectable } from '@angular/core';
import { HttpParams, HttpClient} from '@angular/common/http';
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

  loginService(param: any): Observable<boolean>  {
      return this.httpClient.post(this.baseUrl +'/api/user/login',param)
      .pipe(
        map((result:any) => {
          localStorage.setItem('user_details',JSON.stringify(result.user));
          localStorage.setItem('access_token', JSON.stringify(result.token));
          return true;
        })
      );
  }

}
