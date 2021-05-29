import { Column, isColumnIndex } from './column';

describe('Column', () => {
	let column: Column;
	beforeEach(() => {
		column = new Column();
	});

	it('should create an instance', () => {
		expect(new Column()).toBeTruthy();
	});

	it('should have 6 slots', () => {
		expect(column.slots.length).toEqual(6);
	});

	it('should be able to stack coins', () => {
		column.stackCoin('indigo');
		column.stackCoin('indigo');
		expect(column.slots[0].isFilled).toBeTrue();
		expect(column.slots[1].isFilled).toBeTrue();
		expect(column.slots[2].isFilled).toBeFalse();
		expect(column.slots[3].isFilled).toBeFalse();
	});

	it('should detect a complete line', () => {
		column.stackCoin('black');
		column.stackCoin('black');
		expect(column.hasCompleteLine()).toBeFalse();
		column.stackCoin('black');
		column.stackCoin('black');
		expect(column.hasCompleteLine()).toEqual('black');
	});
});

describe('ColumnIndex', () => {
	it('should have a guard', () => {
		expect(isColumnIndex(1)).toBeTrue();
		expect(isColumnIndex(6)).toBeTrue();
		expect(isColumnIndex(-1)).toBeFalse();
		expect(isColumnIndex(10)).toBeFalse();
	});
});
