import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhraseComponent } from './phrase/phrase.component';

const routes: Routes = [
  { path: 'phrases', component: PhraseComponent },
  { path: '', redirectTo: '/phrases', pathMatch: 'full' },
  { path: 'list-phrases-answed', component: PhraseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
