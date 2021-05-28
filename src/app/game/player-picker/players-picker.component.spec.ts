import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersPickerComponent } from './players-picker.component';

describe('PlayerPickerComponent', () => {
	let component: PlayersPickerComponent;
	let fixture: ComponentFixture<PlayersPickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PlayersPickerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayersPickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
