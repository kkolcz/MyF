import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBaseReponse } from '../../_models/DTOs/base-reponse.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  httpGet<T>(url: string): Observable<IBaseReponse<T>> {
    return this.http.get<IBaseReponse<T>>(`${environment.API_URL}${url}`);
  }

  httpPost<T>(url: string, body: any): Observable<IBaseReponse<T>> {
    return this.http.post<IBaseReponse<T>>(
      `${environment.API_URL}${url}`,
      body
    );
  }

  httpPatch<T>(url: string, body: any): Observable<IBaseReponse<T>> {
    return this.http.patch<IBaseReponse<T>>(
      `${environment.API_URL}${url}`,
      body
    );
  }

  httpDelete<T>(url: string): Observable<IBaseReponse<T>> {
    return this.http.delete<IBaseReponse<T>>(`${environment.API_URL}${url}`);
  }

  httpPut<T>(url: string, body: any): Observable<IBaseReponse<T>> {
    return this.http.put<IBaseReponse<T>>(`${environment.API_URL}${url}`, body);
  }
}
