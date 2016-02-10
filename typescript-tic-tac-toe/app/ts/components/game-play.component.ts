import {Component, View, OnInit, Renderer, ViewEncapsulation} from 'angular2/core'
import {BrowserDomAdapter} from 'angular2/platform/browser'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'

import { ServerCommunicator } from '../services/server-communicator.service'
import { ModalDialouge } from '../directives/modal-dialogue.directive'
import { CustomEventService } from '../services/event-pub-sub.service'
import { ModalDialogueInterface } from '../services/app-interfaces.service'
import { GenericConfig } from '../services/generic-config.service'
import { AIGamePlay } from '../services/ai-gamePlay.service'
import { GameStatus } from '../services/game-status.service'
import { Utils } from '../services/utils.service'
import { _settings } from '../settings'

@Component({
	selector: 'GamePlay',
	providers: [AIGamePlay, GameStatus, Utils, BrowserDomAdapter],
	directives: [ROUTER_DIRECTIVES, ModalDialouge],
	// styleUrls: [_settings.cssPath + 'gameplay.css'],
	// encapsulation: ViewEncapsulation.Native,
	templateUrl: _settings.templatePath.component + 'gameplay.template.html'
})

export class GamePlay {
	modalDialogue: ModalDialogueInterface;

	constructor(
		public genericConfig: GenericConfig,
		public aiGamePlay: AIGamePlay,
		public gameStatus: GameStatus,
		public utils: Utils,
		public renderer: Renderer,
		private _dom: BrowserDomAdapter,
		private router: Router,
		private customEventService: CustomEventService,
		private serverCommunicator: ServerCommunicator
	) {

		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
		customEventService.onMoveReceived.subscribe((data: any) => this.onMoveReceived(data));
		this.modalDialogue = {
			isVisible: false,
			title: '',
			body: '',
			showBtn2: false
		};
		this.utils.log(this.genericConfig);
	}

	ngOnInit() {
		this.startGame();
	}

	startGame() {
		this.resetModalConfig();
		this.genericConfig.config.playGame = true;
		this.genericConfig.initCurrentGameConfig();
		this.drawGrid();
	}

	drawGrid() {
		let gridCell: Array<any> = [],
			elem = this._dom.query('ul[id*=game-grid]'),
			liElem = this._dom.querySelectorAll(elem, 'li'),
			that = this;

		this.domCleanUp();
		for (let i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
			for (let j = 1; j <= len; j += 1) {
				let idAttr: Array<any> = [],
					combinedId = i.toString() + j.toString();

				gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
				this.genericConfig.currentGame.moves[combinedId] = 0;
			}
		}
		this._dom.setInnerHTML(elem, gridCell.join(''));

		liElem = this._dom.querySelectorAll(elem, 'li');
		if (!this.utils.isNullUndefined(liElem)) {
			for (let i = 0, len = liElem.length; i < len; i++) {
				this._dom.on(liElem[i], 'click', that.onBlockClick.bind(that));
			}
		}

		if (!this.genericConfig.computerConfig.playerstarts) {
			this.makeAIMove();
		}
	}

	onBlockClick(event: Event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.utils.log('onBlockClick: ', this.genericConfig.config.playGame);
		if (this.genericConfig.config.playGame) {
			let target = <HTMLInputElement>event.target,
				cellnum: number = parseInt(target.getAttribute('data-cellnum'), 10);

			if (!this.genericConfig.currentGame.isWon) {
				this.utils.log(this.genericConfig.currentGame.moves);
				this.utils.log('cellnum: ', cellnum, ' :move: ', this.genericConfig.currentGame.moves[cellnum]);
				if (this.genericConfig.currentGame.moves[cellnum] === 0) {
					this.renderer.setElementClass(target, 'x-text', true);

					this.genericConfig.currentGame.moves[cellnum] = 1;
					this.genericConfig.currentGame.movesIndex[this.genericConfig.currentGame.stepsPlayed] = cellnum;
					this.genericConfig.currentGame.stepsPlayed++;
					this.getGameStatus(true, cellnum);
				} else {
					alert('You cannot move here!');
				}
			}
		}
	}

	makeAIMove() {
		if (!this.genericConfig.config.multiPlayer) {
			let result: number = this.aiGamePlay.makeAIMove();
			this.utils.log('makeAIMove, result: ', result);

			this.genericConfig.currentGame.moves[result] = 2;
			this.genericConfig.currentGame.movesIndex[this.genericConfig.currentGame.stepsPlayed] = result;
			var elem = this._dom.query('li[id*=combine_' + result + ']');

			this.renderer.setElementClass(elem, 'o-text', true);
			this.genericConfig.currentGame.stepsPlayed++;
			this.getGameStatus(false, result);
		}
	}

	onMoveReceived(data: string) {
		let result: number = parseInt(data);
		this.utils.log('make multiPlayer move, result: ', result);

		this.genericConfig.currentGame.moves[result] = 2;
		this.genericConfig.currentGame.movesIndex[this.genericConfig.currentGame.stepsPlayed] = result;
		var elem = this._dom.query('li[id*=combine_' + result + ']');

		this.renderer.setElementClass(elem, 'o-text', true);
		this.genericConfig.currentGame.stepsPlayed++;
		this.getGameStatus(false, result);
	}

	getGameStatus(isHuman: Boolean, move: number) {
		this.utils.log('getGameStatus: ', isHuman);
		let status: string = this.gameStatus.checkGameEnd(isHuman);

		this.utils.log(status);
		switch (status) {
			case 'gameWon':
				this.genericConfig.config.playGame = false;
				if (isHuman) {
					this.showModalDialogue('Player won the match');
					this.sendMoveToSever(move);
				} else {
					this.showModalDialogue('Computer won the match');
				}
				break;

			case 'gameDraw':
				this.genericConfig.config.playGame = false;
				this.showModalDialogue('Match Drawn!');
				this.sendMoveToSever(move);
				break;

			case 'sendMoveToSever':
				if (isHuman) {
					this.sendMoveToSever(move);
				}
				break;

			case 'makeAIMove':
				this.makeAIMove();
				break;
		}
	}

	sendMoveToSever(move: number) {
		this.serverCommunicator.msgSender('send-message', {
			recipient: this.genericConfig.multiPlayerConfig.recipient,
			msg: move
		});
	}

	domCleanUp() {
		let elem = this._dom.query('ul[id*=game-grid]'),
			liElem = this._dom.querySelectorAll(elem, 'li'),
			that = this;

		if (liElem) {
			for (let i = 0, len = liElem.length; i < length; i += 1) {
				liElem[i].removeEventListener('click', that.onBlockClick.bind(that), false);
			}
		}
		this._dom.setInnerHTML(elem, '');
	}

	onHeaderClicked(data: any) {
		if (data.routeName === '/gameplay') {
			switch (data.btnType) {
				case 'left':
					this.goToHome();
					break;

				case 'right':
					this.showModalDialogue('Current Scorecard');
					break;
			}
		}
	}

	showModalDialogue(text: string) {
		this.utils.log('showModalDialogue: ', text);

		this.modalDialogue = {
			isVisible: true,
			title: 'Game Status',
			body: text,
			showBtn2: !this.genericConfig.config.playGame
		};
	}

	onModalClose() {
		this.resetModalConfig();
		if (!this.genericConfig.config.playGame) {
			this.startGame();
		}
	}

	goToHome() {
		this.resetModalConfig();
		console.log('goToHome');
		this.router.navigate(['Home']);
	}

	resetModalConfig() {
		this.modalDialogue = {
			isVisible: false,
			title: '',
			body: '',
			showBtn2: false
		};
	}
}
