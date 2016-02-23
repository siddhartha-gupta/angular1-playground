/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class ModalDialogueDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
			isVisible: '=',
			title: '=',
			body: '=',
			btn1Txt: '=',
			btn2Txt: '=',
			showBtn2: '=',
			btn1Callback: '&',
			btn2Callback: '&',
			closeBtnCallback: '&',
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/modal-dialogue.directive.html';
		public controller = 'ModalDialogueController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() { }

		static factory(): ng.IDirectiveFactory {
			return (() => new ModalDialogueDirective());
		}
    }
}
directives.directive('modalDialogue', app.ModalDialogueDirective.factory());
