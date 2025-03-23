import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBaseReponse } from '../../_models/DTOs/base-reponse.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IPaginationParams } from '../../_models/paginationParams.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  httpGet<T>(url: string): Observable<IBaseReponse<T>> {
    return this.http.get<IBaseReponse<T>>(`${environment.API_URL}${url}`);
  }

  httpGetPaginated<T>(
    url: string,
    pagination: IPaginationParams
  ): Observable<IBaseReponse<T>> {
    const options = {
      params: new HttpParams()
        .set('page', pagination.page)
        .set('pageSize', pagination.pageSize)
        .set('name', pagination.filter),
    };

    return this.http.get<IBaseReponse<T>>(
      `${environment.API_URL}${url}`,
      options
    );
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
