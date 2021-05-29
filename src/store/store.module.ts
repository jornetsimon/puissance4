import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES } from './store.config';

/**
 * The store module
 *
 * Includes states and actions related to the app and features logic
 */
@NgModule({
	imports: [
		CommonModule,
		NgxsModule.forRoot(STATES, OPTIONS_CONFIG),
		NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
		NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
	],
	exports: [NgxsModule],
})
export class NgxsStoreModule {}
