import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'play', loadChildren: () => import('./game/game.module').then((m) => m.GameModule) },
	{ path: '**', redirectTo: 'play' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
