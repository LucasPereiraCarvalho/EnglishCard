import { Component, Input } from '@angular/core';
import { Phrases } from 'src/app/models/phrase.model';

@Component({
  selector: 'app-list-of-phrase-wrong',
  templateUrl: './list-of-phrase-wrong.component.html',
  styleUrls: ['./list-of-phrase-wrong.component.scss'],
})
export class ListOfPhraseWrongComponent {
  @Input() phrasesAnswed: Phrases[];

  phrasesWrong() {
    return this.phrasesAnswed.filter(
      (phrase) => phrase.phraseCorrect === false
    );
  }
}
