import { Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coach } from '../models/coach';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'https://seat-system.pyzenlabs.com/api/coaches';
  private bookseatUrl = 'https://seat-system.pyzenlabs.com/api/book-seats';

  constructor(private httpClient: HttpClient) {}

  getCoachList(): Observable<Coach[]> {
    return this.httpClient.get<GetResponseCoach>(this.baseUrl).pipe(
      map((response) => {
        return response.output;
      }),
      catchError((e) => {
        console.log(e['status']);

        return [];
      })
    );
  }
  bookseat(number_of_seats: number): Observable<any> {
    return this.httpClient
      .post(
        this.bookseatUrl,
        {
          number_of_seats,
        },
        httpOptions
      )
      .pipe();
  }
}
interface GetResponseCoach {
  output: Coach[];
  message: string;
  success: boolean;
}
