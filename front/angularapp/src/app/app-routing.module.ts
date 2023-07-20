import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { RegisterComponent } from './components/register/register.component';
import { GameComponent } from './components/game/game.component';
import { WinnerComponent } from './components/winner/winner.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'game', component: GameComponent },
  { path: 'winner', component: WinnerComponent },
  { path: '**', redirectTo: 'register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
