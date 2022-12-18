import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPhrasesAnswedComponent } from './lista-phrases-answed/lista-phrases-answed.component';
import { PhraseComponent } from './phrase/phrase.component';

const routes: Routes = [
  { path: '', component: PhraseComponent },
  { path: 'list-phrases-answed', component: ListaPhrasesAnswedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
