import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Match } from '../interfaces/match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private myAppUrl: string = enviroment.endpoint;
  private myApiUrl: string = 'api/Players/';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  addPlayers(players: Match): Observable<Match> {
    return this.http.post<Match>(`${this.myAppUrl}${this.myApiUrl}`, players);
  }

  getLastWinners(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.myAppUrl}${this.myApiUrl}last-winners`
    );
  }
}
