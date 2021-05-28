import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { PlayersPickerComponent } from './player-picker/players-picker.component';

const GAME_ROUTES: Routes = [
	{ path: '', redirectTo: 'play' },
	{
		path: 'play',
		component: GameComponent,
	},
];

@NgModule({
	declarations: [GameComponent, PlayersPickerComponent],
	imports: [CommonModule, RouterModule.forChild(GAME_ROUTES), SharedModule],
})
export class GameModule {}
