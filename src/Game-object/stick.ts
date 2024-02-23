import { IStickConfig, IInputConfig } from '../AI/game';
import { Keyboard } from '../input/keyboard';
import { Mouse } from '../input/mouse';
import { GAME_CONFIG } from '../AI/game.config';
import { GameConfig } from '../AI/game.config';
import { Assets } from '../AI/assets';
import { Canvas2D } from '../AI/canvas';
import { Vector2 } from '../geom/vector2';
import { mapRange } from '../common/helper';
import { IAssetsConfig } from '../AI/game';

//------Configurations------//

const inputConfig: IInputConfig = GameConfig.input;
const stickConfig: IStickConfig = GameConfig.stick;
const sprites: IAssetsConfig = GameConfig.sprites;
const sounds: IAssetsConfig = GameConfig.sounds;

export class Stick {

    //------Members------//

    private _sprite: HTMLImageElement = Assets.getSprite(GAME_CONFIG.SPRITES.STICK);
    private _sprite: HTMLImageElement = Assets.getSprite(sprites.paths.stick);
    private _rotation: number = 0;
    private _origin: Vector2 = Vector2.copy(GAME_CONFIG.STICK_ORIGIN);
    private _origin: Vector2 = Vector2.copy(stickConfig.origin);
    private _power: number = 0;
    private _movable: boolean = true;
    private _visible: boolean = true;
    //------Properties------//
    public get position() : Vector2 {
        return Vector2.copy(this._position);
    }
    
    public get rotation(): number {
        return this._rotation;
    }
    public get power(): number {
        return this._power;
    }
    public set movable(value: boolean) {
        this._movable = value;
    }
    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
    }
    public set rotation(value: number) {
        this._rotation = value;
    }
    //------Constructor------//
    constructor(private _position: Vector2) {}
    //------Private Methods------//

    private increasePower(): void {
        this._power += GAME_CONFIG.POWER_TO_ADD_PER_FRAME;
        this._origin.addToX(GAME_CONFIG.STICK_MOVEMENT_PER_FRAME);
        this._power += stickConfig.powerToAddPerFrame;
        this._origin.addToX(stickConfig.movementPerFrame);
    }

    private decreasePower(): void {
        this._power -= GAME_CONFIG.POWER_TO_ADD_PER_FRAME;
        this._origin.addToX(-GAME_CONFIG.STICK_MOVEMENT_PER_FRAME);
        this._power -= stickConfig.powerToAddPerFrame;
        this._origin.addToX(-stickConfig.movementPerFrame);
    }

    private isLessThanMaxPower(): boolean {
        return this._power < GAME_CONFIG.STICK_MAX_POWER;
        return this._power < stickConfig.maxPower;
    }

    private isMoreThanMinPower(): boolean {
        return this._power >= 0;
    }

    private updatePower(): void {

        if (Keyboard.isDown(GAME_CONFIG.INCREASE_SHOT_POWER_KEY) && this.isLessThanMaxPower()) {
        if (Keyboard.isDown(inputConfig.increaseShotPowerKey) && this.isLessThanMaxPower()) {
            this.increasePower();
        }
        else if (Keyboard.isDown(GAME_CONFIG.DECREASE_SHOT_POWER_KEY) && this.isMoreThanMinPower()) {
        else if (Keyboard.isDown(inputConfig.decreaseShotPowerKey) && this.isMoreThanMinPower()) {
            this.decreasePower();
        }
    }
    private updateRotation(): void {
        const opposite: number = Mouse.position.y - this._position.y;
        const adjacent: number = Mouse.position.x - this._position.x;
        this._rotation = Math.atan2(opposite, adjacent);
    }
    //------Public Methods------//
    public hide(): void {
        this._power = 0;
        this._visible = false;
        this._movable = false;
    }

    public show(position: Vector2): void {
        this._position = position;
        this._origin = Vector2.copy(GAME_CONFIG.STICK_ORIGIN);
        this._origin = Vector2.copy(stickConfig.origin);
        this._movable = true;
        this._visible = true;
    }

    public shoot(): void {
        this._origin = Vector2.copy(GAME_CONFIG.STICK_SHOT_ORIGIN);
        const volume: number = mapRange(this._power, 0, GAME_CONFIG.STICK_MAX_POWER, 0, 1);
        Assets.playSound(GAME_CONFIG.SOUNDS.STRIKE, volume);
        this._origin = Vector2.copy(stickConfig.shotOrigin);
        const volume: number = mapRange(this._power, 0, stickConfig.maxPower, 0, 1);
        Assets.playSound(sounds.paths.strike, volume);
    }

    public update(): void {
        if(this._movable) {
            this.updateRotation();
            this.updatePower();
        }
    }
    public draw(): void {
        if(this._visible) {
            Canvas2D.drawImage(this._sprite, this._position, this._rotation, this._origin);
        }
    }
}