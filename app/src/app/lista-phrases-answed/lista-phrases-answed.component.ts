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

  constructor(private router: Router) {
    this.phrasesAnswed = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.phrasesAnswed)
  }

  backPagePhrase() {
    this.router.navigate(['/']);
  }
}
