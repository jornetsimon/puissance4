/**
 * A single coin slot of a grid
 */
export class Slot {
	private _isFilled = false;
	private _filledBy: string;

	get isFilled() {
		return this._isFilled;
	}
	get filledBy() {
		return this._filledBy;
	}

	/**
	 * Mark the slot as filled by a player
	 */
	fill(player: string) {
		if (!this._isFilled) {
			this._isFilled = true;
			this._filledBy = player;
		}
	}
}
