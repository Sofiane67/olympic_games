import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  /**
   * Retrieves data from a country based on its identifier
   * @param {number} id - Country ID
   * @returns {Observable<Olympic>} - Returns the Olympic object corresponding to the id
   * @throws {Error} - Return an error if no data
   */
  getOlympicById(id: number){
    return this.getOlympics().pipe(
      map((olympics: Olympic[]|null) => {
        if(olympics){
          const olympic =  olympics.find((olympic: Olympic) => olympic.id === id);
          if(olympic){
            return olympic
          }else{
            throw new Error('Data not found');
          }
        }
        return null;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    )
  }
}
