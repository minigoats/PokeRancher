import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Leaderboard } from '../models/leaderboard.model';

@Injectable({
    providedIn: 'root'
  })
  export class LeaderboardService {

    constructor(private http: HttpClient) { 
    }
  
    getLeaderboard(): Observable<Leaderboard[]> {
        return this.http.get<Leaderboard[]>(`${environment.apiUrl}/Leaderboard/GetLeaderboard`);
    }
}