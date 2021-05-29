import { Row } from '@model/row';
import { Column, ColumnIndex } from '@model/column';
import { isColor } from '../utilities/color';
import { Slot } from '@model/slot';

export class Grid<Player1Color extends string, Player2Color extends string> {
	readonly rows: [Row, Row, Row, Row, Row, Row];
	readonly columns: [Column, Column, Column, Column, Column, Column, Column];
	readonly player1: string;
	readonly player2: string;

	constructor(private playerColors = ['blue', 'red'] as [Player1Color, Player2Color]) {
		if (playerColors.some((c) => !isColor(c))) {
			throw new Error('Players colors are not correct.');
		}
		if ([...new Set(playerColors)].length !== 2) {
			throw new Error('Both player colors are the same.');
		}

		this.player1 = playerColors[0];
		this.player2 = playerColors[1];
		this.rows = [new Row(), new Row(), new Row(), new Row(), new Row(), new Row()];
		this.columns = [
			new Column(),
			new Column(),
			new Column(),
			new Column(),
			new Column(),
			new Column(),
			new Column(),
		];
	}

	/**
	 * Place a player coin in a given column
	 */
	placeCoin(player: Player1Color | Player2Color, coinColumnIndex: ColumnIndex) {
		if (this.hasWinner()) {
			return;
		}
		const coinRowIndex = this.columns[coinColumnIndex].stackCoin(player);
		this.rows[coinRowIndex].slots[coinColumnIndex].fill(player);
	}

	/**
	 * Checks if a diagonal line of coins from the same player exists
	 */
	private hasCompleteDiagonalLine(): string | false {
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 6; j++) {
				// For every slot
				const slot = this.columns[i].slots[j];

				const antiDiagonalNeighbors: Array<Slot> = [];
				const diagonalNeighbors: Array<Slot> = [];

				for (let n = 1; n <= 3; n++) {
					// Look for neighbors
					const antiDiagonalNeighbor = this.columns[i + n]?.slots[j + n];
					const diagonalNeighbor = this.columns[i + n]?.slots[j - n];

					if (antiDiagonalNeighbor) {
						antiDiagonalNeighbors.push(antiDiagonalNeighbor);
					}
					if (diagonalNeighbor) {
						diagonalNeighbors.push(diagonalNeighbor);
					}
				}

				const detectLine = (origin: Slot, neighbors: Array<Slot>): boolean => {
					return (
						origin.isFilled &&
						neighbors.length === 3 &&
						neighbors.every(
							(neighbor) => neighbor.isFilled && neighbor.filledBy === slot.filledBy
						)
					);
				};
				const antiDiagonalLine = detectLine(slot, antiDiagonalNeighbors);
				const diagonalLine = detectLine(slot, diagonalNeighbors);

				if (antiDiagonalLine || diagonalLine) {
					return slot.filledBy;
				}
			}
		}
		return false;
	}

	/**
	 * Determines if a player won by creating :
	 * - a horizontal line
	 * - a vertical line
	 * - a diagonal line
	 * @return The player who won
	 */
	hasWinner(): string | false {
		const rowLine = this.rows.find((row) => row.hasCompleteLine());
		if (rowLine) {
			return rowLine.hasCompleteLine();
		}
		const columnLine = this.columns.find((row) => row.hasCompleteLine());
		if (columnLine) {
			return columnLine.hasCompleteLine();
		}
		const diagonalLine = this.hasCompleteDiagonalLine();
		if (diagonalLine) {
			return diagonalLine;
		}
		return false;
	}

	/**
	 * Determines if all the slots in the grid are filled
	 * (there is not more available)
	 */
	isFull(): boolean {
		return this.columns.every((column) => column.isFull());
	}
}
