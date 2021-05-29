import { Action, State, StateContext } from '@ngxs/store';
import { ResetGame, StartGame, SwitchTurn } from './game.actions';
import { Player } from '@model/player';
import { Injectable } from '@angular/core';
import { GameService } from '../../app/game/game.service';

export interface GameStateModel {
	started: boolean;
	player1: Player;
	player2: Player;
	next: Player;
	ended: boolean;
	winner?: Player;
}

@State<GameStateModel>({
	name: 'game',
})
@Injectable()
export class GameState {
	constructor(private gameService: GameService) {}

	@Action(StartGame)
	public startGame(ctx: StateContext<GameStateModel>, { payload }: StartGame) {
		const player1 = payload.players[0];
		const player2 = payload.players[1];
		ctx.setState({
			started: true,
			player1,
			player2,
			ended: false,
			next: player1,
		});
	}

	@Action(SwitchTurn)
	public switchTurn(ctx: StateContext<GameStateModel>) {
		const grid = this.gameService.grid;
		const winner = grid.hasWinner();
		if (winner) {
			// There is a winner
			const { player1, player2 } = ctx.getState();
			const winningPlayer = player1.color === winner ? player1 : player2;
			ctx.patchState({ winner: winningPlayer, ended: true, next: undefined });
		} else if (grid.isFull()) {
			// Grid is full, it's a draw
			ctx.patchState({ ended: true, next: undefined });
		} else {
			// Game not over, no winner yet
			const state = ctx.getState();
			const currentPlayer = state.next;
			const upcomingPlayer =
				state.player1.name === currentPlayer.name ? state.player2 : state.player1;
			ctx.patchState({
				next: upcomingPlayer,
			});
		}
	}

	@Action(ResetGame)
	public reset(ctx: StateContext<GameStateModel>) {
		ctx.patchState({
			started: false,
			player1: undefined,
			player2: undefined,
			next: undefined,
			ended: false,
			winner: undefined,
		});
	}
}
