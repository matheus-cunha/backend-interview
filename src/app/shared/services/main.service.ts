import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { PlaneInterface } from '../models/plane-interface';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  url = 'http://5e58725f11703300147aea7e.mockapi.io/main';

  constructor(private HttpClient: HttpClientService) {
  }

  listProjects(): Observable<HttpResponse<PlaneInterface[]>> {
    return this.HttpClient.get<PlaneInterface[]>(this.url);
  }
}
