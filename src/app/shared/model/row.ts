import { Slot } from '@model/slot';
import { SlotLine } from '@model/slot-line';

/**
 * A row of coin slots
 */
export class Row extends SlotLine {
	readonly slots: [Slot, Slot, Slot, Slot, Slot, Slot, Slot];
	constructor() {
		super(7);
	}
}
