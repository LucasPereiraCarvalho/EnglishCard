import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { phrases } from '../models/phrase.model';
import { Phrases } from '../models/phrases';

@Injectable({
  providedIn: 'root',
})
export class PhraseService {
  getPhrases(): Observable<phrases[]> {
    return of(Phrases).pipe(
      map((response: any) =>
        response.map((phrase: phrases, index: number) => {
          return {
            ...phrase,
            id: index + 1,
          };
        })
      )
    );
  }
}
