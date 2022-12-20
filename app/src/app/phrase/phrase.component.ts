import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { phrases } from '../models/phrase.model';
import { PhraseService } from '../services/phrase.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss'],
})
export class PhraseComponent implements OnInit {
  phrases: phrases[] = [];
  phrasesAnswed: phrases[] = [];
  phraseShow: phrases = {
    id: 0,
    portuguesePhrase: '',
    englishPhrase: '',
    verbalTime: '',
    phraseAnswed: '',
  };

  formAnswerControl = new FormControl('', [Validators.required]);

  constructor(
    private phraseService: PhraseService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.phraseService
      .getPhrases()
      .pipe(take(1))
      .subscribe((phrases: phrases[]) => {
        this.phrases = this.addIdInObject(phrases);
        this.shuffle(this.phrases);
      });
    this.showNextPhraseInPortuguse();
  }

  addIdInObject(phrases: phrases[]): phrases[] {
    return phrases.map((phrase, index) => {
      return {
        ...phrase,
        id: index + 1,
      };
    });
  }

  shuffle(array: phrases[]) {
    array.sort(() => Math.random() - 0.5);
  }

  saveAnswed(phrase: phrases, phraseAnswed: string) {
    const answer = {
      ...phrase,
      phraseAnswed: phraseAnswed,
    };

    this.phrasesAnswed.push(answer);
    const message = phraseAnswed === '' ? 'Phrase skiped' : 'Phrase saved';
    this._snackBar.open(message);

    this.showNextPhraseInPortuguse();
  }

  showNextPhraseInPortuguse() {
    const phrasesDontAnswed = this.phrases.filter(
      (p) => p.phraseAnswed === undefined
    );
    for (const phrase of phrasesDontAnswed) {
      const phraseNotAnswed = !this.phrasesAnswed.find(
        (p) => p.id === phrase.id
      );
      if (phraseNotAnswed) {
        this.phraseShow = phrase;
        this.formAnswerControl.reset();
        break;
      }
    }
  }

  navigateToListPhrasesAnswed() {
    this.router.navigate(['/list-phrases-answed'], {
      state: this.phrasesAnswed,
    });
  }
}
