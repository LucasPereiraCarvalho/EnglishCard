import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { phrases } from '../models/phrase.model';

@Component({
  selector: 'app-lista-phrases-answed',
  templateUrl: './lista-phrases-answed.component.html',
  styleUrls: ['./lista-phrases-answed.component.scss'],
})
export class ListaPhrasesAnswedComponent {
  phrasesAnswed: phrases[] | any = [];
  showPhrase = true;
  labelBtnShowPhrase = 'Show Phrase Wrong';

  constructor(private router: Router) {
    this.phrasesAnswed = this.router.getCurrentNavigation()?.extras.state;
  }

  backPagePhrase() {
    this.router.navigate(['/']);
  }

  answerCorrect(id: number, correct: boolean) {
    this.phrasesAnswed = this.phrasesAnswed.map((phrase: phrases) => {
      return phrase.id === id
        ? {
            ...phrase,
            phraseCorrect: correct,
          }
        : { ...phrase };
    });
  }

  score(): string {
    if (!this.phrasesAnswed) return '0 / 0';

    const phrasesCorrect = this.phrasesAnswed.filter(
      (p: phrases) => p.phraseCorrect === true
    );

    return `${phrasesCorrect.length} / ${this.phrasesAnswed.length}`;
  }

  showPhraseOrshowPhraseWrong() {
    this.showPhrase = !this.showPhrase;
    this.labelBtnShowPhrase = this.showPhrase
      ? 'Show Phrase Wrong'
      : 'Show Phrase';
  }
}
