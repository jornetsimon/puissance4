export class Slot {
	private _isFilled = false;
	private _filledBy: string;

	get isFilled() {
		return this._isFilled;
	}
	get filledBy() {
		return this._filledBy;
	}

	fill(player: string) {
		if (!this._isFilled) {
			this._isFilled = true;
			this._filledBy = player;
		}
	}
}
