import { Row } from './row';

describe('Row', () => {
	let row: Row;
	beforeEach(() => {
		row = new Row();
	});

	it('should create an instance', () => {
		expect(row).toBeTruthy();
	});

	it('should have 7 slots', () => {
		expect(row.slots.length).toEqual(7);
	});

	it('should detect a complete line', () => {
		row.slots[0].fill('black');
		row.slots[1].fill('black');
		expect(row.hasCompleteLine()).toBeFalse();
		row.slots[2].fill('black');
		row.slots[3].fill('black');
		expect(row.hasCompleteLine()).toEqual('black');
	});
});
