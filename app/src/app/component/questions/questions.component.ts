import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Phrases } from '../../models/phrase.model';
import {
  VerbalTimesFuture,
  VerbalTimesPast,
  VerbalTimesPresent,
} from '../../models/verbalTime';
import { PhraseService } from '../../services/phrase.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Output() phrasesAnsewered = new EventEmitter<Phrases[]>();

  phrases: Phrases[] = [];
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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPhrases();
    this.showNextQuestion();
  }

  getPhrases() {
    this.phraseService
      .getPhrases()
      .pipe(take(1))
      .subscribe((phrases: Phrases[]) => {
        this.phrases = phrases.sort(() => Math.random() - 0.5);
      });
  }

  showNextQuestion() {
    const getPhrasesDontAnswed = this.phrases.filter(
      (p) => p.phraseAnswed === undefined
    );
    for (const phrase of getPhrasesDontAnswed) {
      this.phraseShow = phrase;
      this.formAnswerGroup.reset();
      break;
    }
  }

  optionVerbalTimeSelected(option: string) {
    this.verbalTimeSelected = option;
  }

  saveAnswed(phraseShow: Phrases, phraseAnswed: string) {
    this.updatePhrases(phraseShow, phraseAnswed);
    this.phrasesAnsewered.emit(this.phrases);
    this.showNextQuestion();
  }

  private updatePhrases(phraseShow: Phrases, phraseAnswed: string) {
    this.phrases = this.phrases.map((phrase: Phrases) => {
      return phrase.id === phraseShow.id
        ? {
            ...phrase,
            phraseAnswed: phraseAnswed,
            verbalTimeAnswed:
              !!this.verbalTimeSelected && phraseAnswed !== 'N/A'
                ? this.verbalTimeSelected
                : 'N/A',
          }
        : { ...phrase };
    });

    this.showSnack(phraseAnswed);
  }

  showSnack(phraseAnswed: string) {
    const message = phraseAnswed === '' ? 'Phrase skiped' : 'Phrase saved';
    this._snackBar.open(message, 'Undo', {
      duration: 3000,
    });
  }

  score() {
    const score = this.phrases.filter((p) => p.phraseAnswed).length.toString();
    return score + ' / ' + this.phrases.length;
  }
}
