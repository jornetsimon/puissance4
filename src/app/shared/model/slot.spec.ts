import { Slot } from './slot';

describe('Slot', () => {
	it('should create an instance', () => {
		expect(new Slot()).toBeTruthy();
	});
	it('can be filled', () => {
		const slot = new Slot();
		const player = 'blue';
		expect(slot.isFilled).toBeFalse();
		expect(slot.filledBy).toBeUndefined();
		slot.fill(player);
		expect(slot.isFilled).toBeTrue();
		expect(slot.filledBy).toEqual(player);
	});
});
