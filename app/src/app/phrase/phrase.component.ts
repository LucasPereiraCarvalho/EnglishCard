import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    portuguesePhrase: '',
    englishPhrase: '',
    verbalTime: '',
    phraseAnswed: '',
  };

  formAnswerControl = new FormControl('', [Validators.required]);

  constructor(private phraseService: PhraseService, private router: Router) {}

  ngOnInit(): void {
    this.phraseService.getPhrases().subscribe((phrases: phrases[]) => {
      this.phrases = this.addIdInObject(phrases);
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

  saveAnswed(phrase: phrases, phraseAnswed: string) {
    const answer = {
      ...phrase,
      phraseAnswed: phraseAnswed,
    };

    this.phrasesAnswed.push(answer);
    this.showNextPhraseInPortuguse();
  }

  showNextPhraseInPortuguse() {
    for (const phrase of this.phrases) {
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
    this.router.navigate(['/list-phrases-answed'])
  }
}
