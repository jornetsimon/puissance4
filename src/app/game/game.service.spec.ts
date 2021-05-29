import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
	let service: GameService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GameService);
	});
});
