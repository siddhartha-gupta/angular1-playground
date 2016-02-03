import {Injectable} from 'angular2/core'
import { GenericConfig } from './GenericConfig.service'
import { CurrentGameConfig } from './CurrentGameConfig.service'

@Injectable()
export class AIGamePlay {
	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig) { }

	private aiThinking: Number;
	private cachedNextMove: any;

	chooseMove(istowin?: Boolean) {
		let gridValue = (istowin) ? 2 : 1,
			result: any;

		for (let n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
			var n1 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][1]],
				n2 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][2]],
				n3 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];

			if ((n1 == gridValue) && (n2 == gridValue) && (n3 === 0)) {
				result = this.genericConfig.config.ways[n][3];
				break;
			}
			if ((n3 == gridValue) && (n1 == gridValue) && (n2 === 0)) {
				result = this.genericConfig.config.ways[n][2];
				break;
			}
			if ((n2 == gridValue) && (n3 == gridValue) && (n1 === 0)) {
				result = this.genericConfig.config.ways[n][1];
				break;
			}
		}
		return result;
	}

	seekBestMove() {
		if (this.genericConfig.config.playerstarts) {
			return this.playerStartsGame();
		} else {
			return this.aiStartsGame();
		}
	}

	playerStartsGame() {
		let moveIndex0: number = parseInt(this.currentGameConfig.currentGame.movesIndex[0], 10),
			moveIndex1: number = parseInt(this.currentGameConfig.currentGame.movesIndex[1], 10),
			moveIndex2: number = parseInt(this.currentGameConfig.currentGame.movesIndex[2], 10),
			result: number,
			dlta: number,
			randomPosition: Array<number> = [];

		switch (this.currentGameConfig.currentGame.stepsPlayed) {
			case 1:
				if (moveIndex0 == 11 || moveIndex0 == 13 || moveIndex0 == 31 || moveIndex0 == 33) {
					result = 22;
					this.aiThinking = 1;
				} else if (moveIndex0 == 22) {
					result = this.chooseCorner('noPrefrence');
					this.aiThinking = 2;
				} else {
					result = 22;
					this.aiThinking = 3;
				}
				break;

			case 3:
				if (this.aiThinking == 1) {
					if (moveIndex2 == 44 - moveIndex0) {
						result = this.genericConfig.config.choices[1 + (2 * Math.floor(Math.random() * 4))];
					} else {
						result = 44 - moveIndex0;
					}
				} else if (this.aiThinking === 2 && (moveIndex2 == 44 - moveIndex1)) {
					result = this.chooseCorner('blank');
				} else if (this.aiThinking == 3) {
					if (moveIndex2 == 11 || moveIndex2 == 13 || moveIndex2 == 31 || moveIndex2 == 33) {
						result = 44 - moveIndex2;
					}

					if (moveIndex2 == 44 - moveIndex0) {
						dlta = 22 - moveIndex2;
						result = 22 + (10 / dlta);
						this.cachedNextMove = result + dlta;
						console.log('cachedNextMove: ', this.cachedNextMove);
					} else {
						dlta = 22 - moveIndex0;
						randomPosition.push(moveIndex0 + (10 / dlta));
						randomPosition.push(moveIndex0 - (10 / dlta));
						randomPosition.push(moveIndex2 + dlta);
						result = randomPosition[Math.floor(Math.random() * randomPosition.length)];
					}
				}
				break;

			case 5:
				if (this.aiThinking == 3 && this.cachedNextMove !== undefined) {
					result = this.cachedNextMove;
				}
				break;
		}
		console.log('playerStartsGame: ', result);
		return result;
	}

	aiStartsGame() {
		let moveIndex0: number = parseInt(this.currentGameConfig.currentGame.movesIndex[0], 10),
			moveIndex1: number = parseInt(this.currentGameConfig.currentGame.movesIndex[1], 10),
			moveIndex2: number = parseInt(this.currentGameConfig.currentGame.movesIndex[2], 10),
			moveIndex3: number = parseInt(this.currentGameConfig.currentGame.movesIndex[3], 10),
			result: number,
			dlta: number,
			randomPosition: Array<number> = [];

		if (this.currentGameConfig.currentGame.stepsPlayed === 0) {
			result = this.genericConfig.config.choices[2 * Math.floor(Math.random() * 5)];

			if (result == 22) {
				this.aiThinking = 1;
			} else {
				this.aiThinking = 2;
			}
		} else
			if (this.currentGameConfig.currentGame.stepsPlayed == 2) {
				if (this.aiThinking == 1) {
					if (moveIndex1 == 11 || moveIndex1 == 13 || moveIndex1 == 31 || moveIndex1 == 33) {
						result = 44 - moveIndex1;
					} else {
						dlta = 22 - moveIndex1;
						randomPosition.push(22 + dlta + (10 / dlta));
						randomPosition.push(22 + dlta - (10 / dlta));
						result = randomPosition[Math.floor(Math.random() * randomPosition.length)];
					}
				} else if (this.aiThinking == 2) {
					if (moveIndex1 == 22) {
						result = 44 - moveIndex0;
						this.aiThinking = 21;
					} else if (moveIndex1 == 11 || moveIndex1 == 13 || moveIndex1 == 31 || moveIndex1 == 33) {
						result = this.chooseCorner('blank');
						this.aiThinking = 22;
					} else {
						result = 22;
						this.aiThinking = 23;
					}
				}
			} else if (this.currentGameConfig.currentGame.stepsPlayed == 4) {
				if (this.aiThinking == 22) {
					for (let i = 0; i < 4; i++) {
						if (this.currentGameConfig.currentGame.moves[this.genericConfig.config.corners[i]] === 0) {
							result = this.genericConfig.config.corners[i];
						}
					}
				} else if (this.aiThinking == 23) {
					dlta = moveIndex1 - moveIndex0;
					var rp0 = 44 - (moveIndex1 + dlta)
					randomPosition.push(rp0);
					randomPosition.push((rp0 + moveIndex0) / 2);
					result = randomPosition[Math.floor(Math.random() * randomPosition.length)];
				} else if (this.aiThinking == 1) {
					result = 44 + moveIndex2 - (2 * moveIndex3);
				}
			}
		return result;
	}

	makeRandomMove() {
		let result: any;

		do {
			result = this.genericConfig.config.choices[Math.floor(Math.random() * 9)];
		} while (this.currentGameConfig.currentGame.moves[result] !== 0);

		return result;
	}

	chooseCorner(choice?: string) {
		let result: any;

		switch (choice) {
			case 'blank':
				do {
					result = this.genericConfig.config.corners[Math.floor(Math.random() * 4)];
				} while (this.currentGameConfig.currentGame.moves[result] !== 0);
				break;

			case 'noPrefrence':
				result = this.genericConfig.config.corners[Math.floor(Math.random() * 4)];
				break;
		}
		return result;
	}
}