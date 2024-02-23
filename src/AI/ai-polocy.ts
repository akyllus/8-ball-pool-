import { GAME_CONFIG } from './../game.config';
import { GameConfig } from './../game.config';
import { GameWorld } from './../game-objects/game-world';

export class AIPolicy {
    constructor() {}
    public evaluate(gameWorld: GameWorld): number {
        let evaluation: number = 1;
        for (let i = 0 ; i < gameWorld.balls.length; i++){
            for(let j = i + 1 ; j < gameWorld.balls.length ; j++){
    
                let firstBall = gameWorld.balls[i];
                let secondBall = gameWorld.balls[j];

                evaluation += firstBall.position.distFrom(secondBall.position) * GAME_CONFIG.AI_BALL_DISTANCE_BONUS;
                evaluation += firstBall.position.distFrom(secondBall.position) * GameConfig.ai.ballDistanceBonus;
            }
        }

        if (gameWorld.isTurnValid) {
            evaluation += GAME_CONFIG.AI_VALID_TURN_BONUS;
            evaluation += GAME_CONFIG.AI_POCKETED_BALLS_BONUS * gameWorld.numOfPocketedBallsOnTurn;
            evaluation += GameConfig.ai.validTurnBonus;
            evaluation += GameConfig.ai.pocketedBallBonus * gameWorld.numOfPocketedBallsOnTurn;

            if (gameWorld.isGameOver) {
                evaluation += GAME_CONFIG.AI_GAME_WON_BONUS;
                evaluation += GameConfig.ai.gameWonBonus;
            }
        }
        else {
            evaluation = evaluation - GAME_CONFIG.AI_INVLID_TURN_PENALTY;
            evaluation = evaluation - GameConfig.ai.invalidTurnPenalty;

            if (gameWorld.isGameOver) {
                evaluation -= GAME_CONFIG.AI_GAME_LOSS_PENALTY;
                evaluation -= GameConfig.ai.gameLossPenalty;
            }
        }

        return evaluation;
    }
}