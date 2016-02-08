import {Component, View, OnInit, Output, EventEmitter} from 'angular2/core'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'modal-dialogue, [modal-dialogue]',
	templateUrl: _settings.templatePath.directive + 'modal-dialogue.template.html'
})

export class ModalDialouge {
	@Output() btn1Callback: EventEmitter<any> = new EventEmitter();
	@Output() btn2Callback: EventEmitter<any> = new EventEmitter();
	@Output() closeBtnCallback: EventEmitter<any> = new EventEmitter();

	constructor(private genericConfig: GenericConfig) { }

	mainMenu(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.resetModalConfig();
		this.btn1Callback.emit(event);
	}

	playAgain(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.resetModalConfig();
		this.btn2Callback.emit(event);
	}

	hideModal(event?: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.resetModalConfig();
		this.closeBtnCallback.emit(event);
	}

	resetModalConfig() {
		this.genericConfig.config.modalDialogue = {
			isVisible: false,
			title: '',
			body: ''
		};
	}
}