import {Component, View, OnInit, ElementRef, Renderer} from 'angular2/core'
import {BrowserDomAdapter} from 'angular2/platform/browser'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../helpers/settings'
import { GenericConfig } from '../services/GenericConfig.service'
import { CurrentGameConfig } from '../services/CurrentGameConfig.service'
import { AIGamePlay } from '../services/AIGamePlay.service'
import { GameStatus } from '../services/GameStatus.service'
import { Utils } from '../services/utils.service'

@Component({
	selector: 'game-play-grid',
	providers: [AIGamePlay, GameStatus, Utils, BrowserDomAdapter],
	templateUrl: _settings.buildPath + 'gameplay.template.html'
})

export class GamePlay {
	theHtmlString: string = '';

	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig, public aiGamePlay: AIGamePlay, public gameStatus: GameStatus, public utils: Utils, public elementRef: ElementRef, public renderer: Renderer, private _dom: BrowserDomAdapter) {
		this.startGame();
	}

	startGame() {
		this.currentGameConfig.initDefaultConfig();
		this.drawGrid();
	}

	drawGrid() {
		let gridCell: Array<any> = [];
		this.theHtmlString = '';

		for (let i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
			for (let j = 1; j <= len; j += 1) {
				let idAttr: Array<any> = [],
					combinedId = i.toString() + j.toString();

				gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
				this.currentGameConfig.currentGame.moves[combinedId] = 0;
			}
		}
		this.theHtmlString = gridCell.join('');
		this.renderer.listen(this.elementRef.nativeElement, 'click', (event: Event) => {
			this.onBlockClick(event);
		});

		if (!this.genericConfig.config.playerstarts) this.makeAIMove();
	}

	onBlockClick(event: Event) {
		console.log('onBlockClick');

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		var cellnum = event.target.getAttribute('data-cellnum');

		if (!this.currentGameConfig.currentGame.isWon) {
			if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
				this.renderer.setText(event.target, 'X');
				this.renderer.setElementClass(event.target, 'x-text', true);

				this.currentGameConfig.currentGame.moves[cellnum] = 1;
				this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = cellnum;
				this.currentGameConfig.currentGame.stepsPlayed++;
				this.checkGameEnd(true);
			} else {
				alert('You cannot move here!');
			}
		}
	}

	checkGameEnd(isHuman: Boolean) {
		console.log('checkGameEnd: ', isHuman);
		let status: string = this.gameStatus.checkGameEnd(isHuman);

		console.log(status);
		switch (status) {
			case 'gameComplete':
				setTimeout(() => {
					this.startGame();
				}, 100);
				break;

			case 'makeAIMove':
				this.makeAIMove();
		}
	}

	makeAIMove() {
		let result = '00';

		// check if ai can win
		result = this.aiGamePlay.chooseMove(true);

		// check move to prevent ai loss
		if (!result || result == '00') {
			result = this.aiGamePlay.chooseMove(false);
		} else {
			console.log('winning move is possible: ', result);
		}

		// check best possible move for ai
		if (!result || result == '00') {
			result = this.aiGamePlay.seekBestMove();
		} else {
			console.log('move to prevent defeat: ', result);
		}

		if (!result || result == '00' || result <= 10) {
			result = this.aiGamePlay.makeRandomMove();
			console.log('making random move: ', result);
		} else {
			console.log('best move available: ', result);
		}
		console.log('result: ', result);

		this.currentGameConfig.currentGame.moves[result] = 2;
		this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
		// $('li[id*=combine_' + result + ']').text('O').addClass('o-text');
		var elem = this._dom.query('li[id*=combine_' + result + ']');

		this.renderer.setText(elem, 'O');
		this.renderer.setElementClass(elem, 'o-text', true);
		this.currentGameConfig.currentGame.stepsPlayed++;
		this.checkGameEnd(false);
	}
}
