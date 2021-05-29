import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player } from '@model/player';
import { GameService } from './game.service';
import { isColumnIndex } from '@model/column';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent {
	constructor(public gameService: GameService) {}

	get grid() {
		return this.gameService.grid;
	}

	onPlayersSelected(players: [Player, Player]) {
		this.gameService.startGame(players).subscribe();
	}

	onColumnSelected(colIndex: number) {
		if (isColumnIndex(colIndex)) {
			this.gameService.placeCoin(colIndex).subscribe();
		}
	}
}
