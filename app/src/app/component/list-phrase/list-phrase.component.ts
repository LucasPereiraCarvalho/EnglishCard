import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Phrases } from '../../models/phrase.model';

@Component({
  selector: 'app-list-phrase',
  templateUrl: './list-phrase.component.html',
  styleUrls: ['./list-phrase.component.scss'],
})
export class ListPhraseComponent {
  @Input() phrasesAnswed: Phrases[];
  @Output() phrasesAnswedUpdated = new EventEmitter<Phrases[]>();

  answerCorrect(id: number, correct: boolean) {
    this.phrasesAnswed = this.phrasesAnswed.map((phrase: Phrases) => {
      return phrase.id === id
        ? {
            ...phrase,
            phraseCorrect: correct,
          }
        : { ...phrase };
    });

    this.phrasesAnswedUpdated.emit(this.phrasesAnswed);
  }
}
