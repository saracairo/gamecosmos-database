import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Game, APIResponse } from '../interfaces/Game';

const BASE_URL = 'https://rawg-video-games-database.p.rapidapi.com';
const API_KEY = '7b2ccae3803f421098821f6ef3402741';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // metodo che restituisce i dati nel formato gestito dall'interfaccia Game:
  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    // default: ordering
    let params = new HttpParams().set('ordering', ordering);

    // se l'utente sta digitando qualcosa nella search-bar, aggiungere - append - parametro search
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    // restituisce l'attuale risposta API tramite metodo get di http
    return this.http.get<APIResponse<Game>>(`${BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
