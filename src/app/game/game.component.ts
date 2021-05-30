import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player } from '@model/player';
import { GameService } from './game.service';
import { isColumnIndex } from '@model/column';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';
import { NgxVibrationService } from 'ngx-vibration';

@UntilDestroy()
@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent {
	constructor(
		public gameService: GameService,
		private router: Router,
		private vibrationService: NgxVibrationService
	) {
		this.gameService.winner$
			.pipe(
				filter((winner) => !!winner),
				untilDestroyed(this)
			)
			.subscribe(() => {
				confetti({ particleCount: 120, spread: 100, origin: { y: 0.8 }, ticks: 300 });
				this.vibrationService.vibrate([59, 253, 58, 110, 835, 0]);
			});
	}

	onPlayersSelected(players: [Player, Player]) {
		this.gameService.startGame(players).subscribe();
	}

	onColumnSelected(colIndex: number) {
		if (isColumnIndex(colIndex)) {
			this.gameService.placeCoin(colIndex).subscribe();
		}
	}

	playAgain() {
		this.gameService.reset();
		this.router.navigateByUrl('/play');
	}
}
