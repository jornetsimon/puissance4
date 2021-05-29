import { Slot } from '@model/slot';
import { SlotLine } from '@model/slot-line';

export class Column extends SlotLine {
	readonly slots: [Slot, Slot, Slot, Slot, Slot, Slot];
	constructor() {
		super(6);
	}

	/**
	 * Fill the first empty slot in the column
	 * @param player The player playing the coin
	 * @returns The filled row index
	 */
	stackCoin(player: string): number {
		const firstEmptySlotIndex = this.canStackCoin();
		if (firstEmptySlotIndex === false) {
			throw new Error(`No slot available in column`);
		}
		this.slots[firstEmptySlotIndex].fill(player);
		return firstEmptySlotIndex;
	}

	/**
	 * Determines if the column can accept more coins
	 * @returns The index of the first empty slot, or false if the column in full
	 */
	canStackCoin(): number | false {
		const firstEmptySlotIndex = this.slots.findIndex((slot) => !slot.isFilled);
		return firstEmptySlotIndex >= 0 ? firstEmptySlotIndex : false;
	}
}

export type ColumnIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export function isColumnIndex(n: number): n is ColumnIndex {
	return [0, 1, 2, 3, 4, 5, 6].includes(n);
}
