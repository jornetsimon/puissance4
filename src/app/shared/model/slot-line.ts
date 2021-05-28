import { Slot } from '@model/slot';

export abstract class SlotLine {
	slots: Array<Slot>;
	readonly completeLineLength = 4;

	protected constructor(slotsCount: number) {
		this.slots = [];
		for (let i = 0; i < slotsCount; i++) {
			this.slots.push(new Slot());
		}
	}

	/**
	 * Checks if n consecutive slots have been filled by a same person
	 */
	hasCompleteLine(): string | false {
		let count = 0;
		for (let i = 0; i < this.slots.length; i++) {
			const current = this.slots[i];
			const previous = i === 0 ? undefined : this.slots[i - 1];
			if (!previous && current.isFilled) {
				count = 1;
			} else if (
				previous?.isFilled &&
				current.isFilled &&
				previous.filledBy === current.filledBy
			) {
				count++;
			} else {
				count = 1;
			}
			if (count === this.completeLineLength) {
				return current.filledBy;
			}
		}
		return false;
	}
}
