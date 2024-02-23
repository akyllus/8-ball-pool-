import { IInputConfig, ICursorConfig, IVector2 } from './../game.config.type';
import { IMenuCommand } from './commands/menu-command';
import { GAME_CONFIG } from '../game.config';
import { GameConfig } from '../game.config';
import { Mouse } from '../input/mouse';
import { Canvas2D } from '../canvas';
import { Vector2 } from '../geom/vector2';
import { Assets } from '../assets';
import { IAssetsConfig } from '../game.config.type';

//------Configurations------//

const inputConfig: IInputConfig = GameConfig.input;
const cursorConfig: ICursorConfig = GameConfig.cursor;
const sprites: IAssetsConfig = GameConfig.sprites;

export class MenuButton {

    //------Members------//

    private _activeSprite: HTMLImageElement;
    private _hovered: boolean;

    //------Properties------//

    private set hovered(value: boolean) {
        this._hovered = value;
    }

    //------Constructor------//

    constructor(
        private _command: IMenuCommand,
        private _value: any,
        private _position: Vector2, 
        private _position: IVector2, 
        private _spriteKey: string, 
        private _spriteOnHoverKey: string,
    ) {
        this._activeSprite = Assets.getSprite(GAME_CONFIG.SPRITES[this._spriteKey]);
        this._activeSprite = Assets.getSprite(sprites.paths[this._spriteKey]);
    }

    private isInsideButton(position: Vector2) {
    //------Private Methods------//

    private isInsideButton(position: IVector2) {
        return position.x > this._position.x &&
               position.x < this._position.x + this._activeSprite.width &&
               position.y > this._position.y &&
               position.y < this._position.y + this._activeSprite.height;
    }

    //------Public Methods------//

    public handleInput() {

        this.hovered = this.isInsideButton(Mouse.position);
        this._activeSprite = this._hovered ? 
                             Assets.getSprite(GAME_CONFIG.SPRITES[this._spriteOnHoverKey]) : 
                             Assets.getSprite(GAME_CONFIG.SPRITES[this._spriteKey]);
                             Assets.getSprite(sprites.paths[this._spriteOnHoverKey]) : 
                             Assets.getSprite(sprites.paths[this._spriteKey]);

        if(this._hovered && Mouse.isPressed(GAME_CONFIG.SELECT_MOUSE_BUTTON)) {
            Canvas2D.changeCursor(GAME_CONFIG.DEFAULT_CURSOR);
        if(this._hovered && Mouse.isPressed(inputConfig.mouseSelectButton)) {
            Canvas2D.changeCursor(cursorConfig.default);
            this._command.execute(this._value);
        }
    }
    public update(): void {
        this.handleInput();
    }

    public draw(): void {
        if(this._hovered) {
            Canvas2D.changeCursor(GAME_CONFIG.BUTTON_CURSOR);
            Canvas2D.changeCursor(cursorConfig.button);
        }
        Canvas2D.drawImage(this._activeSprite, this._position);
    }
}