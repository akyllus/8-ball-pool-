import { Game } from '../../game';
import { IMenuCommand } from './menu-command';

export class GoToSubMenuCommand implements IMenuCommand {

    //------Constructor------//

    constructor(private _game: Game) {}

    execute(value: any): void {
    //------Public Methods------//

    public execute(value: any): void {
       this._game.goToSubMenu(value);
    }

}