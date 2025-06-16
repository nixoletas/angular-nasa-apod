import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apod } from '../interface/apod.interface';
import { Observable } from 'rxjs';
import { Today } from '../interface/today.interface';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl = "/api/apod";
  todayUrl = "/api/today";

  getApod(): Observable<Apod[]> {
    return this.http.get<Apod[]>(this.apiUrl);
  }

  getToday(): Observable<Today> {
    return this.http.get<Today>(this.todayUrl);
  }
}
