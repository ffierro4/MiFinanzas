import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  player1: string = '';
  player2: string = '';
  player1Choice: string | null = null;
  player2Choice: string | null = null;
  winner: string | null = null;
  player1Score: number = 0;
  player2Score: number = 0;
  roundsToWin: number = 3;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.player1 = params['player1'];
      this.player2 = params['player2'];
    });
  }

  makeMove(player: string, choice: string) {
    if (player === 'player1') {
      this.player1Choice = choice;
    } else if (player === 'player2') {
      this.player2Choice = choice;
    }

    if (this.player1Choice && this.player2Choice) {
      this.calculateWinner();
    }
  }

  calculateWinner() {
    if (this.player1Choice === this.player2Choice) {
      this.winner = "It's a tie!";
    } else if (
      (this.player1Choice === 'Rock' && this.player2Choice === 'Scissors') ||
      (this.player1Choice === 'Scissors' && this.player2Choice === 'Paper') ||
      (this.player1Choice === 'Paper' && this.player2Choice === 'Rock')
    ) {
      this.winner = this.player1;
      this.player1Score++;
    } else {
      this.winner = this.player2;
      this.player2Score++;
    }

    this.checkWinner();
  }

  checkWinner() {
    if (this.player1Score === this.roundsToWin) {
      this.router.navigate(['/winner'], {
        queryParams: { winner: this.player1 },
      });
      this.saveWinnerToDatabase(this.player1);
    } else if (this.player2Score === this.roundsToWin) {
      this.router.navigate(['/winner'], {
        queryParams: { winner: this.player2 },
      });
      this.saveWinnerToDatabase(this.player2);
    } else {
      this.player1Choice = null;
      this.player2Choice = null;
      this.winner = null;
    }
  }

  saveWinnerToDatabase(winnerName: string) {
    const apiUrl = 'https://localhost:7189/api/players/save-winner';
    this.http.post(apiUrl, { winner: winnerName }).subscribe(
      (response) => {
        //console.log() de guía
        console.log('Ganador guardado en la base de datos');
      },
      (error) => {
        console.error(
          'Error al guardar el ganador en la base de datos:',
          error
        );
      }
    );
  }
}
