import { Component, Input } from '@angular/core';
import { MatCardAppearance } from '@angular/material/card';
import { Phrases } from '../models/phrase.model';

@Component({
  selector: 'app-list-phrase',
  templateUrl: './list-phrase.component.html',
  styleUrls: ['./list-phrase.component.scss'],
})
export class ListPhraseComponent {
  @Input() phrasesAnswed: Phrases[]
}
