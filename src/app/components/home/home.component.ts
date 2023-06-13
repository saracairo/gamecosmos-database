import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/interfaces/Game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;


  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['game-search']) {
        // check search query nell'url: se presenti, chiamare metodo searchGames con questi parametri:
        this.searchGames('metacrit', params['game-search']);
      } else {
        // se non presenti, chiamare il metodo col solo parametro 'metacrit':
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string) {
    this.http.getGameList(sort, search).subscribe(
      (gameList: APIResponse<Game>) => {
        // fit property result to games
        this.games = gameList.results;
        console.log(gameList);
      }
    )
  }

  openGameDetails(id: string): void {
    this.router.navigate(['game-details', id]);
  }

  ngOnDestroy(): void {
      if (this.gameSub) {
        this.gameSub.unsubscribe();
      }

      if (this.routeSub) {
        this.routeSub.unsubscribe();
      }
  }

}
