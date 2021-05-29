import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';
import { environment } from '../environments/environment';

export const STATES = [];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
	/**
	 * Run in development mode. This will add additional debugging features:
	 * - Object.freeze on the state and actions to guarantee immutability
	 */
	developmentMode: !environment.production,
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
	/**
	 * Whether the dev tools is enabled or note. Useful for setting during production.
	 */
	disabled: environment.production,
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
	/**
	 * Disable the logger. Useful for prod mode..
	 */
	disabled: environment.production,
};
