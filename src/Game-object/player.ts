import { GAME_CONFIG } from '../AI/game.config';
import { Color } from '../common/color';
import { Canvas2D } from '../AI/canvas';

export class Player {

    //------Properties------//

    public color: Color;
    public matchScore: number = 0;
    public overallScore: number = 0;
}