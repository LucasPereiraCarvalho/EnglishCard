import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { phrases } from '../models/phrase.model';

@Injectable({
  providedIn: 'root',
})
export class PhraseService {
  phrases = [
    {
      portuguesePhrase: 'Onde ele mora?',
      englishPhrase: 'Where does he live?',
      verbalTime: 'Simple Present',
    },
    {
      portuguesePhrase: 'Não durmo há três dias',
      englishPhrase: "I haven't slept for three days",
      verbalTime: 'PP',
    },
    {
      portuguesePhrase: 'Você estava com eles quando um acidente aconteceu?',
      englishPhrase: 'Were you with them when an accident happened?',
      verbalTime: 'PC',
    },
    {
      portuguesePhrase: 'Ninguém conhece ele',
      englishPhrase: 'No One knows him',
      verbalTime: 'SP',
    },
    {
      portuguesePhrase: 'Acabei de chegar em casa',
      englishPhrase: 'I have just arrived at home',
      verbalTime: 'PP',
    },
    {
      portuguesePhrase: 'Quantos anos ela tinha quando começou a estudar?',
      englishPhrase: 'How old was she when she started school?',
      verbalTime: 'PS',
    },
    {
      portuguesePhrase: 'Por que você está triste?',
      englishPhrase: 'Why are you sad?',
      verbalTime: 'SP',
    },
    {
      portuguesePhrase: 'Conheço essa mulher, mas esqueci-me do seu nome',
      englishPhrase: 'I know that woman, but I have forgotten her name',
      verbalTime: 'SP - PP',
    },
    {
      portuguesePhrase: 'Você já jantou?',
      englishPhrase: 'Have you eaten dinner yet?',
      verbalTime: 'PP',
    },
    {
      portuguesePhrase: 'A janela está quebrada há três dias',
      englishPhrase: 'The window has been broken for three days',
      verbalTime: 'PPC',
    },
    {
      portuguesePhrase: 'Quem mora naquela casa?',
      englishPhrase: 'Who lives in that house?',
      verbalTime: 'SP',
    },
    {
      portuguesePhrase: 'Chove muito há uma hora',
      englishPhrase: 'It has been raining a lot for an hour',
      verbalTime: 'PPC',
    },
    {
      portuguesePhrase: 'O que você está fazendo neste fim de semana?',
      englishPhrase: 'What are you doing in this weekend?',
      verbalTime: 'Future',
    },
    {
      portuguesePhrase: 'Eu provavelmente vou viajar amanhã às 14h',
      englishPhrase: 'I might travel tomorrow at 2 p.m',
      verbalTime: 'Future',
    },
    {
      portuguesePhrase: 'O que você faz?',
      englishPhrase: 'What do you do?',
      verbalTime: 'SP',
    },
    {
      portuguesePhrase: 'Você os viu ontem?',
      englishPhrase: 'Did you see them yesterday?',
      verbalTime: 'SP',
    },
    {
      portuguesePhrase:
        'Eu não liguei para você ontem porque eu tinha que dormir cedo',
      englishPhrase: "I didn't call you yesterday because I had to sleep early",
      verbalTime: '',
    },
    {
      portuguesePhrase: 'Era um dia ensolarado',
      englishPhrase: 'It was a sunny day',
      verbalTime: 'PS',
    },
    {
      portuguesePhrase: 'De onde é?',
      englishPhrase: 'Where are you from?',
      verbalTime: 'SP',
    },
    {
      portuguesePhrase: 'Eu tentei falar com ela todos os dias',
      englishPhrase: 'I tried to speak to her every day',
      verbalTime: 'PS',
    },
  ];

  getPhrases(): Observable<phrases[]> {
    return of(this.phrases).pipe(map((response: phrases[]) => response));
  }
}
