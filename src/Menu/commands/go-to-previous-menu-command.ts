import { IMenuCommand } from './menu-command';
import { Game } from '../../game';

export class GoToPreviousMenuCommand implements IMenuCommand {

    //------Constructor------//

    constructor(private _game: Game) {}

    //------Public Methods------//

    execute(): void {
    public execute(): void {
        this._game.goToPreviousMenu();
    }

}