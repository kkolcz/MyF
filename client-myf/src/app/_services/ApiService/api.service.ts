import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBaseReponse } from '../../_models/DTOs/base-reponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  httpGet<T>(url: string): Observable<IBaseReponse<T>> {
    return this.http.get<IBaseReponse<T>>(url);
  }

  httpPost<T>(url: string, body: any): Observable<IBaseReponse<T>> {
    return this.http.post<IBaseReponse<T>>(url, body);
  }

  httpPatch<T>(url: string, body: any): Observable<IBaseReponse<T>> {
    return this.http.patch<IBaseReponse<T>>(url, body);
  }

  httpDelete<T>(url: string): Observable<IBaseReponse<T>> {
    return this.http.delete<IBaseReponse<T>>(url);
  }

  httpPut<T>(url: string, body: any): Observable<IBaseReponse<T>> {
    return this.http.put<IBaseReponse<T>>(url, body);
  }
}
