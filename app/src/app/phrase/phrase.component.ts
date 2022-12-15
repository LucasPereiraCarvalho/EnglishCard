import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { phrases } from '../models/phrase.model';
import { PhraseService } from '../services/phrase.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss'],
})
export class PhraseComponent implements OnInit {
  phrasesAnswer: phrases[] = [];
  phrases: phrases[] = [];
  phraseShow: phrases[] = [];

  constructor(private phraseService: PhraseService) {}

  ngOnInit(): void {
    this.phraseService.getPhrases().subscribe((phrases: phrases[]) => {
      this.phrases = this.addIdInObject(phrases);
    });
    this.showOnlyOnePhraseInPortuguse();
  }

  addIdInObject(phrases: phrases[]): phrases[] {
    return phrases.map((phrase, index) => {
      return {
        ...phrase,
        id: index + 1,
      };
    });
  }

  showOnlyOnePhraseInPortuguse() {
    for (const phrase of this.phrases) {
      if (this.phrasesAnswer.includes(phrase)) return;
      else {
        console.log('add');
        this.phrasesAnswer.push(phrase);
        this.phraseShow[0] = phrase;
        break;
      }
    }

    console.log(this.phrasesAnswer);
    return this.phraseShow;
  }
}
