import { IAIConfig, IStickConfig } from './../game.config.type';
import { Vector2 } from './../geom/vector2';
import { GAME_CONFIG } from './../game.config';
import { GameConfig } from './../game.config';
import { GameWorld } from './../game-objects/game-world';
import { AIOpponent } from './ai-opponent';
import { AIPolicy } from './ai-policy';
import cloneDeep = require('lodash/cloneDeep');
import { Mouse } from '../input/mouse';

const aiConfig: IAIConfig = GameConfig.ai;
const stickConfig: IStickConfig = GameConfig.stick;

export class AITrainer {

    private _policy: AIPolicy;
    private _opponents: AIOpponent[];
    private _currentOpponent: AIOpponent;
    private _initialGameWorld: GameWorld;
    private _gameWorld: GameWorld;
    private _iteration: number = 0;
    private _finishedSession: boolean = true;
    private _bestOpponent: AIOpponent;
    private _soundOnState: boolean;
    public get finishedSession() : boolean {
        return this._finishedSession;
    }
    constructor() {
        this._policy = new AIPolicy();
    }
    private placeBallInHand(gameWorld: GameWorld): void {
        debugger;

        let marginX = 5;
        let pos = Vector2.copy(GAME_CONFIG.CUE_BALL_POSITION);
        let pos = Vector2.copy(GameConfig.cueBallPosition);

        while(!gameWorld.isValidPosToPlaceCueBall(pos)) {
            pos.addToX(marginX);
        }
        gameWorld.placeBallInHand(pos);
    }
    private init(): void {
        this._opponents = [];
        this._currentOpponent = this.createRandomOpponent();
        this._bestOpponent = this._currentOpponent;
        this._iteration = 0;
    }

    private createMutation(opponent: AIOpponent): AIOpponent {
        let newPower = opponent.power;
        newPower += (Math.random() * 2 * GAME_CONFIG.AI_SHOT_POWER_MUTATION_VARIANCE) - GAME_CONFIG.AI_SHOT_POWER_MUTATION_VARIANCE;
        newPower = newPower < GAME_CONFIG.AI_MIN_SHOT_POWER ? GAME_CONFIG.AI_MIN_SHOT_POWER : newPower;
        newPower = newPower > GAME_CONFIG.STICK_MAX_POWER ? GAME_CONFIG.STICK_MAX_POWER : newPower;
        newPower += (Math.random() * 2 * aiConfig.shotPowerMutationVariance) - aiConfig.shotPowerMutationVariance;
        newPower = newPower < aiConfig.minShotPower ? aiConfig.minShotPower : newPower;
        newPower = newPower > stickConfig.maxPower ? stickConfig.maxPower : newPower;

        let newRotation = opponent.rotation;

@@ -73,8 +77,8 @@ export class AITrainer {

    private train(): void {

        if(this._iteration === GAME_CONFIG.AI_TRAIN_ITERATIONS){
            GAME_CONFIG.SOUND_ON = this._soundOnState;
        if(this._iteration === aiConfig.trainIterations){
            GameConfig.soundOn = this._soundOnState;
            this.playTurn();
            this._finishedSession = true;
            return;
@@ -131,8 +135,8 @@ export class AITrainer {
    }

    public startSession(gameWorld: GameWorld): void {
        this._soundOnState = GAME_CONFIG.SOUND_ON;
        GAME_CONFIG.SOUND_ON = false;
        this._soundOnState = GameConfig.soundOn;
        GameConfig.soundOn = false;
        if(gameWorld.isBallInHand) {
            this.placeBallInHand(gameWorld);
        }
        this._initialGameWorld = gameWorld;
        this._gameWorld = cloneDeep(gameWorld);
        this.init();
        this._finishedSession = false;
        this.simulate();
        this.opponentTrainingLoop();
    }
}
export const AI = new AITrainer();
  63 changes: 38 additions & 25 deletions63  
src/assets.ts