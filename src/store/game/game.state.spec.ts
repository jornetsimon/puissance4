import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from './game.state';

describe('Game store', () => {
	let store: Store;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [NgxsModule.forRoot([GameState])],
		}).compileComponents();
		store = TestBed.get(Store);
	}));
});
