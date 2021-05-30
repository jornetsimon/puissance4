import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Slot } from '@model/slot';

@Component({
	selector: 'app-slot',
	templateUrl: './slot.component.html',
	styleUrls: ['./slot.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class SlotComponent {
	@Input() slot: Slot;
	constructor() {}
}
