import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ICompany {
  id?: string;
  name: string;
  image?: string;
  description?: string;
}

// TODO: we can configure HttpClient with a default base url
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/companies`);
  }

  getPopulars(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/companies/popular`);
  }

  remove(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/companies/${id}`);
  }

  insert(payload: ICompany) {
    return this.http.post(`${environment.apiBaseUrl}/companies`, payload);
  }

  update(payload: ICompany) {
    return this.http.put(
      `${environment.apiBaseUrl}/companies/${payload?.id}`,
      payload
    );
  }
}
