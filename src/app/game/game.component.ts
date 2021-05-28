import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player } from '@model/player';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
	constructor() {}

	onPlayersSelected(players: [Player, Player]) {
		console.log('selected players', players);
	}
}
