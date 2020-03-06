import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { PlaneInterface } from '../models/plane-interface';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private url = 'http://5e58725f11703300147aea7e.mockapi.io/aeronaves/';

  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  constructor(private api: HttpClientService) { }
  
  list(search?: string): Observable<HttpResponse<Array<PlaneInterface>>> {
    const urlFilter = search !== undefined ? this.url + '?search=' + search : '';
    return this.api.get<Array<PlaneInterface>>(urlFilter);
  } 

  register(body: PlaneInterface): Observable<HttpResponse<PlaneInterface>> {
    return this.api.post<PlaneInterface>(this.url, JSON.stringify(body), this.headers);
  }

  delete(id: number): Observable<HttpResponse<PlaneInterface>> {
    return this.api.delete<PlaneInterface>(this.url + id);
  }

  edit(id: number, body: PlaneInterface): Observable<HttpResponse<PlaneInterface>> {
    const novaUrl = this.url + id;
    return this.api.put<PlaneInterface>(novaUrl, JSON.stringify(body), this.headers);
  }
}
