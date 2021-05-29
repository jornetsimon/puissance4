import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '@model/column';

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ColumnComponent {
	@Input() column: Column;
	@Input() nextColor: string | undefined;
	@Output() selected = new EventEmitter<void>();
	constructor() {}

	onClick() {
		if (!this.isLocked()) {
			this.selected.emit();
		}
	}

	isLocked() {
		return this.column.isFull() || !this.nextColor;
	}
}
