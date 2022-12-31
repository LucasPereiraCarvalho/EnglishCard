import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ListPhraseComponent } from './list-phrase/list-phrase.component';

export interface Tab {
  label: string;
  content: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'English Card';
}
