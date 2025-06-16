import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apod } from '../interface/apod.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl = "/api/apod";

  getApod(): Observable<Apod[]> {
    return this.http.get<Apod[]>(this.apiUrl);
  }
}
