import { Player } from '@model/player';

export class StartGame {
	public static readonly type = '[Game] Starting';
	constructor(public payload: { players: [Player, Player] }) {}
}
export class SwitchTurn {
	public static readonly type = '[Game] Switching turn';
}
export class CheckWinner {
	public static readonly type = '[Game] Checking for a winner';
}
export class ResetGame {
	public static readonly type = '[Game] Resetting';
}
