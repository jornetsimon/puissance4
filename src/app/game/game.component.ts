import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player } from '@model/player';
import { GameService } from './game.service';
import { isColumnIndex } from '@model/column';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import confetti from 'canvas-confetti';

@UntilDestroy()
@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent {
	constructor(public gameService: GameService) {
		this.gameService.winner$
			.pipe(
				filter((winner) => !!winner),
				untilDestroyed(this)
			)
			.subscribe(() => {
				confetti({ particleCount: 120, spread: 100, origin: { y: 0.8 }, ticks: 300 });
			});
	}

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
