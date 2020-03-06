import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private data = new BehaviorSubject<boolean>(true);

  constructor() { }

  setRefresh(data: boolean) {
    this.data.next(data);
  }

  getRefresh(): Observable<boolean> {
    return this.data.asObservable();
  }
}