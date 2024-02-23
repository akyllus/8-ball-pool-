import { IAssetsConfig } from './../../game.config.type';
import { IMenuCommand } from './menu-command';
import { GAME_CONFIG } from '../../game.config';
import { GameConfig } from '../../game.config';

//------Configurations------//

const sprites: IAssetsConfig = GameConfig.sprites;

export class ToggleSoundCommand implements IMenuCommand {

    //------Private Methods------//

    private toggleMuteButtonSprite(): void {
        const currentMuteButtonPath: string = GAME_CONFIG.SPRITES.MUTE_BUTTON;
        const currentMuteButtonHoveredPath: string = GAME_CONFIG.SPRITES.MUTE_BUTTON_HOVERED;
        GAME_CONFIG.SPRITES.MUTE_BUTTON = GAME_CONFIG.SPRITES.MUTE_BUTTON_PRESSED;
        GAME_CONFIG.SPRITES.MUTE_BUTTON_HOVERED = GAME_CONFIG.SPRITES.MUTE_BUTTON_PRESSED_HOVERED;
        GAME_CONFIG.SPRITES.MUTE_BUTTON_PRESSED = currentMuteButtonPath;
        GAME_CONFIG.SPRITES.MUTE_BUTTON_PRESSED_HOVERED = currentMuteButtonHoveredPath;
        const currentMuteButtonPath: string = sprites.paths.muteButton;
        const currentMuteButtonHoveredPath: string = sprites.paths.muteButtonHovered;
        sprites.paths.muteButton = sprites.paths.muteButtonPressed;
        sprites.paths.muteButtonHovered = sprites.paths.muteButtonPressedHovered;
        sprites.paths.muteButtonPressed = currentMuteButtonPath;
        sprites.paths.muteButtonPressedHovered = currentMuteButtonHoveredPath;
    }

    //------Public Methods------//

    public execute(): void {
        GAME_CONFIG.SOUND_ON = !GAME_CONFIG.SOUND_ON;
        GameConfig.soundOn = !GameConfig.soundOn;
        this.toggleMuteButtonSprite();
    }

}