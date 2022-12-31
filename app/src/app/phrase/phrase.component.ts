import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Phrases } from '../models/phrase.model';
import {
  VerbalTimesFuture,
  VerbalTimesPast,
  VerbalTimesPresent,
} from '../models/verbalTime';
import { PhraseService } from '../services/phrase.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss'],
})
export class PhraseComponent implements OnInit {
  phrases: Phrases[] = [];
  phrasesAnswed: Phrases[] = [];
  phraseShow: Phrases;
  verbalTimeSelected: string;

  optionsVerbalTimesFuture: string[] = VerbalTimesFuture;
  optionsVerbalTimesPresent: string[] = VerbalTimesPresent;
  optionsVerbalTimesPast: string[] = VerbalTimesPast;

  formAnswerGroup = new FormGroup({
    verbalTime: new FormControl('', [Validators.required]),
    phraseAnswed: new FormControl('', [Validators.required]),
  });

  constructor(
    private phraseService: PhraseService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPhrases();
    this.showNextPhraseInPortuguse();
  }

  getPhrasesAnsewered(event: Phrases[]) {
    console.log('componente barra', event);
    // this.phrasesAnswed.push(...event);
  }

  private getPhrases() {
    this.phraseService
      .getPhrases()
      .pipe(take(1))
      .subscribe(
        (phrases: Phrases[]) =>
          (this.phrases = phrases.sort(() => Math.random() - 0.5))
      );
  }

  optionSelected(option: string) {
    this.verbalTimeSelected = option;
  }

  saveAnswed(phrase: Phrases, phraseAnswed: string) {
    this.phrasesAnswed.push({
      ...phrase,
      phraseAnswed: phraseAnswed,
      verbalTimeAnswed:
        !!this.verbalTimeSelected && phraseAnswed !== 'N/A'
          ? this.verbalTimeSelected
          : 'N/A',
    });

    this.showSnack(phraseAnswed);
    this.showNextPhraseInPortuguse();
  }

  private showSnack(phraseAnswed: string) {
    const message = phraseAnswed === '' ? 'Phrase skiped' : 'Phrase saved';
    this._snackBar.open(message);
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
        this.formAnswerGroup.reset();
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
