import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WookieService {

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<any> {
    return this.http.get('https://wookie.codesubmit.io/movies');
  }
  public searchMovies(searchQuery: string): Observable<any> {
    return this.http.get(`https://wookie.codesubmit.io/movies?q=${searchQuery}`);
  }
}
