import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apod } from '../interface/apod.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  constructor(
    private http: HttpClient,
  ) { }

  apiKey = 'SVqYcjbj5bcwdhqN4F791dVpUa8GFucO7W6AwAbQ';
  apiUrl = 'https://api.nasa.gov/planetary/apod?';
  apiParams = {
    api_key: this.apiKey,
    count: 10
  };

  getApod(): Observable<Apod[]> {
    return this.http.get<Apod[]>(`${this.apiUrl}api_key=${this.apiKey}&count=${this.apiParams.count}`);
  }
}
