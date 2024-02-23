import { GAME_CONFIG } from '../../game.config.type.ts';
import { GameConfig } from './../../game.config.type.ts';
import { IMenuCommand } from './menu-command.type.ts';
import { Game } from '../../game';

export class PVCCommand implements IMenuCommand {

    //------Constructor------//

    constructor(private _game: Game) {}

    //------Public Methods------//

    execute(iterationsValue: number): void {
        GAME_CONFIG.AI_PLAYER_INDEX = Math.floor(Math.random() * 2);
        GAME_CONFIG.AI_ON = true;
        GAME_CONFIG.AI_TRAIN_ITERATIONS = iterationsValue;
    public execute(iterationsValue: number): void {
        GameConfig.ai.playerIndex = Math.floor(Math.random() * 2);
        GameConfig.ai.on = true;
        GameConfig.ai.trainIterations = iterationsValue;
        this._game.start();
    }
}