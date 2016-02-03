import {Component, View, OnInit} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {AppHeader} from './header.component'
import {GamePlay} from './game-play.component'
import {GameScore} from './game-score.component'
import {GameLevel} from './game-level.component'

import {_settings} from '../settings'

@Component({
	selector: 'game-app',
	templateUrl: _settings.templatePath.component + 'app.template.html',
	directives: [AppHeader, GamePlay, GameScore, GameLevel]
})

export class App {
	constructor() { }
}
