import { Grid } from '@model/grid';
import { ColumnIndex } from '@model/column';

describe('Grid', () => {
	const instance = new Grid();
	it('should create an instance', () => {
		expect(new Grid()).toBeTruthy();
		expect(new Grid(['yellow', '#0088ff'])).toBeTruthy();
		expect(() => new Grid(['notacolor', '#a600ff'])).toThrow();
		expect(() => new Grid(['purple', 'purple'])).toThrow();
	});
	it('should define the colors for the two players', () => {
		expect(instance.player1).toBeTruthy();
		expect(instance.player2).toBeTruthy();
		expect(instance.player1 === instance.player2).toBeFalse();
	});
	it('should have 6 rows', () => {
		expect(instance.rows.length).toEqual(6);
	});
	it('should have 7 columns', () => {
		expect(instance.columns.length).toEqual(7);
	});

	describe('coins', () => {
		it('can be placed in a given column', () => {
			const grid = new Grid(['blue', 'green']);
			expect(() => {
				grid.placeCoin('blue', 1);
				grid.placeCoin('green', 1);
				grid.placeCoin('blue', 2);
				grid.placeCoin('green', 5);
				grid.placeCoin('blue', 4);
				grid.placeCoin('green', 1);
			}).not.toThrow();
			expect(grid.columns[1].slots.filter((slot) => slot.isFilled).length).toEqual(3);

			grid.placeCoin('blue', 1);
			grid.placeCoin('blue', 1);
			grid.placeCoin('blue', 1);
			expect(() => {
				// 7th coin in the first column
				grid.placeCoin('blue', 1);
			}).toThrow();
		});
	});

	describe('winning', () => {
		it('should detect a horizontal line of 4 same colors', () => {
			const grid = new Grid(['cyan', 'pink']);
			grid.placeCoin('cyan', 1);
			grid.placeCoin('pink', 2);
			grid.placeCoin('cyan', 3);
			grid.placeCoin('pink', 4);
			grid.placeCoin('cyan', 0);
			expect(grid.hasWinner()).toBeFalse();
			grid.placeCoin('cyan', 2);
			grid.placeCoin('cyan', 3);
			grid.placeCoin('cyan', 4);
			grid.placeCoin('cyan', 5);
			expect(grid.hasWinner()).toBeFalse();
			grid.placeCoin('cyan', 5);
			expect(grid.hasWinner()).toEqual('cyan');
		});
		it('should detect a vertical line of 4 same colors', () => {
			const grid = new Grid(['purple', 'orange']);
			grid.placeCoin('orange', 4);
			grid.placeCoin('orange', 4);
			grid.placeCoin('purple', 4);
			expect(grid.hasWinner()).toBeFalse();
			grid.placeCoin('orange', 4);
			grid.placeCoin('orange', 4);
			expect(grid.hasWinner()).toBeFalse();

			grid.placeCoin('purple', 2);
			grid.placeCoin('orange', 2);
			grid.placeCoin('orange', 2);
			grid.placeCoin('orange', 2);
			grid.placeCoin('orange', 2);
			expect(grid.hasWinner()).toEqual('orange');
		});
		it('should detect a diagonal line of 4 same colors', () => {
			const grid = new Grid(['lime', 'brown']);
			grid.placeCoin('brown', 1);
			grid.placeCoin('lime', 1);
			grid.placeCoin('brown', 1);
			grid.placeCoin('lime', 2);
			grid.placeCoin('brown', 2);
			grid.placeCoin('lime', 3);

			grid.placeCoin('lime', 2);
			grid.placeCoin('lime', 3);
			grid.placeCoin('lime', 4);
			expect(grid.hasWinner()).toBeFalse();

			grid.placeCoin('lime', 1);
			expect(grid.hasWinner()).toEqual('lime');
		});
		it('should detect an antidiagonal line of 4 same colors', () => {
			const grid = new Grid(['orange', 'red']);
			grid.columns[3].slots[2].fill('red');
			grid.columns[4].slots[3].fill('red');
			grid.columns[5].slots[4].fill('red');
			grid.columns[6].slots[5].fill('red');
			expect(grid.hasWinner()).toEqual('red');
		});
	});

	it('can determine if all slots are filled', () => {
		const grid = new Grid(['grey', 'black']);
		expect(grid.isFull()).toBeFalse();
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 6; j++) {
				if (i === 1 && j === 3) {
					expect(grid.isFull()).toBeFalse();
				}
				grid.placeCoin('grey', i as ColumnIndex);
			}
		}
		expect(grid.isFull()).toBeTrue();
	});
});
