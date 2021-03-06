/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface UserInfoInterface {
		startEditMode(event: Event): void;
		cancelEditMode(event?: Event, noreset?: Boolean): void;
		onMouseClick(event: Event): void;
		actionCallback(event: Event, type: string, userId: string): void;
		validateForm(): void;
	}
}
