import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getColorName, initColors, ORIGINAL_COLORS } from 'ntc-ts';
import { debounceTime, first, map, shareReplay, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Player } from '@model/player';

/**
 * Players color selection
 */
@Component({
	selector: 'app-players-picker',
	templateUrl: './players-picker.component.html',
	styleUrls: ['./players-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPickerComponent {
	@Output() playersSelected = new EventEmitter<[Player, Player]>();
	player1ColorFc = new FormControl(this.generateRandomColor(), Validators.required);
	player2ColorFc = new FormControl(this.generateRandomColor(), Validators.required);
	form = new FormGroup({
		player1: this.player1ColorFc,
		player2: this.player2ColorFc,
	});
	player1Name$ = this.player1ColorFc.valueChanges.pipe(
		startWith(this.player1ColorFc.value),
		debounceTime(200),
		map((color) => this.getNameFromHexColor(color)),
		shareReplay(1)
	);
	player2Name$ = this.player2ColorFc.valueChanges.pipe(
		startWith(this.player2ColorFc.value),
		debounceTime(200),
		map((color) => this.getNameFromHexColor(color)),
		shareReplay(1)
	);
	constructor() {
		initColors(ORIGINAL_COLORS);
	}

	/**
	 * Returns a name for a color
	 */
	getNameFromHexColor(colorHex: string): string {
		return getColorName(colorHex).name;
	}

	generateRandomColor() {
		return (
			'#' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padEnd(6, '0')
		);
	}

	submit(formValues: { player1: string; player2: string }) {
		combineLatest([this.player1Name$, this.player2Name$])
			.pipe(
				first(),
				map(([p1Name, p2Name]): [Player, Player] => {
					return [
						{
							name: p1Name,
							color: formValues.player1,
						},
						{
							name: p2Name,
							color: formValues.player2,
						},
					];
				})
			)
			.subscribe((players) => {
				this.playersSelected.emit(players);
			});
	}
}
