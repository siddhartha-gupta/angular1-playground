/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserFormController implements UserFormInterface {
		private formSubmit: Function;
		private userData: UserDataInterface;
		private userDataId: string;
		private locationOption: Object;

		constructor() {
			this.locationOption = app.Constants.Default.locationOption;
		}

		onFormSubmit(event: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.formSubmit({ data: this.userData, userDataId: this.userDataId });
		}
	}
}
controllers.controller('UserFormController', app.UserFormController);
