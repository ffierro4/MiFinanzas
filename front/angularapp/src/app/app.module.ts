import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { GameComponent } from './components/game/game.component';
import { WinnerComponent } from './components/winner/winner.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    GameComponent,
    WinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    AppRoutingModule,
    RouterModule,
  ],
  exports: [HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
