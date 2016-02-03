import {Component, View, OnInit} from 'angular2/core'
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'
import { Utils } from '../services/utils.service'

@Component({
	selector: 'game-level',
	providers: [Utils],
	directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
	templateUrl: _settings.templatePath.component + 'gamelevel.template.html'
})

export class GameLevel {
	radioItems: Array<Object>;

	constructor(private genericConfig: GenericConfig, private utils: Utils) {
		this.radioItems = [{
			'value': 1,
			'text': 'Easy',
		},
			{
				'value': 2,
				'text': 'Medium'
			},
			{
				'value': 3,
				'text': 'Expert'
			}];
	}
}