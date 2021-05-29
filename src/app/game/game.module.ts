import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { PlayersPickerComponent } from './player-picker/players-picker.component';
import { NgxsModule } from '@ngxs/store';
import { GameState } from '../../store/game/game.state';
import { ColumnComponent } from './column/column.component';
import { SlotComponent } from './slot/slot.component';

const GAME_ROUTES: Routes = [
	{
		path: '',
		component: GameComponent,
		children: [{ path: '**', component: GameComponent }],
	},
];

@NgModule({
	declarations: [GameComponent, PlayersPickerComponent, ColumnComponent, SlotComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(GAME_ROUTES),
		SharedModule,
		NgxsModule.forFeature([GameState]),
	],
})
export class GameModule {}
