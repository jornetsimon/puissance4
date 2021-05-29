import { Injectable } from '@angular/core';
import { Player } from '@model/player';
import { Select, Store } from '@ngxs/store';
import { ResetGame, StartGame, SwitchTurn } from '../../store/game/game.actions';
import { Grid } from '@model/grid';
import { Router } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GameStateModel } from '../../store/game/game.state';
import { ColumnIndex } from '@model/column';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	grid: Grid<string, string>;
	@Select((state) => state.game.started) started$: Observable<boolean>;
	@Select((state) => state.game.next) turn$: Observable<Player>;
	@Select((state) => state.game.winner) winner$: Observable<Player | undefined>;
	@Select((state) => state.game) state$: Observable<GameStateModel>;

	constructor(private store: Store, private router: Router) {}

	startGame(players: [Player, Player]) {
		const player1 = players[0];
		const player2 = players[1];
		this.grid = new Grid([player1.color, player2.color]);
		return this.store
			.dispatch(new StartGame({ players }))
			.pipe(
				switchMap(() =>
					this.router.navigateByUrl(
						`/play/${player1.name.replace(/\s/g, '')}-vs-${player2.name.replace(
							/\s/g,
							''
						)}`
					)
				)
			);
	}

	placeCoin(columnIndex: ColumnIndex) {
		return this.turn$.pipe(
			first(),
			tap((player) => this.grid.placeCoin(player.color, columnIndex as ColumnIndex)),
			switchMap(() => this.store.dispatch([new SwitchTurn()]))
		);
	}

	reset() {
		return this.store.dispatch([new ResetGame()]);
	}
}
