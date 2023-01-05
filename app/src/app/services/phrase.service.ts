import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Phrases } from '../models/phrase.model';
import { Phrases as PhrasesMock } from '../models/phrases';

@Injectable({
  providedIn: 'root',
})
export class PhraseService {
  getPhrases(): Observable<Phrases[]> {
    return of(PhrasesMock).pipe(
      map((response: any) =>
        response.map((phrase: Phrases, index: number) => {
          return {
            ...phrase,
            id: index + 1,
          };
        })
      )
    );
  }
}
