import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Match } from 'src/app/interfaces/match';
import { MatchService } from 'src/app/services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  lastWinners: string[] = [];

  constructor(
    private fb: FormBuilder,
    private _playerService: MatchService,
    private router: Router
  ) {
    this.form = this.fb.group({
      player1: ['', Validators.required],
      player2: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getLastWinners();
  }

  addPlayers() {
    const player1 = this.form.get('player1')?.value;
    const player2 = this.form.get('player2')?.value;

    const match: Match = {
      player1,
      player2,
    };

    this._playerService.addPlayers(match).subscribe((data) => {
      this.router.navigate(['/game'], {
        queryParams: { player1, player2 },
      });
    });
  }

  getLastWinners() {
    this._playerService.getLastWinners().subscribe(
      (winners) => {
        this.lastWinners = winners;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
