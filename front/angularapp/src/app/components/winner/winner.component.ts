import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css'],
})
export class WinnerComponent implements OnInit {
  winner: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.winner = params['winner'];
    });
  }

  playAgain() {
    this.router.navigate(['/register']);
  }
}
